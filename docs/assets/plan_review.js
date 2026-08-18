/**
 * Kenfigure — Configuration Migration "Plan Review" utility
 * =============================================================
 *
 * Filters the "Validate plan" page of Benchling's Configuration Migration import
 * UI (https://<tenant>.benchling.com/config-migration/import) down to the
 * material changes, in the browser — a DOM-native port of scripts/filter_import_plan.py.
 *
 * Why: after a Kenfigure round trip (Benchling export -> Kenfigure Tool export ->
 * Kenfigure Tool import), the plan is dominated by expected, non-material noise:
 * provenance identifier remints, dropdown option / field position shifts of 1,
 * FieldsetConfig remove-and-replace pairs, and bare "Creating Identifier" lines.
 * Anything left over is a real difference worth investigating. On a large tenant
 * this noise can be thousands of lines, making the real issues hard to spot by
 * eye. This tool does the same filtering filter_import_plan.py does against a
 * copy-pasted plan text file, but reads the live "All Changes" panel directly, so
 * there's no copy-paste step.
 *
 * Usage (full instructions: docs/plan-review.md):
 *   1. In the import wizard ("new migration experience"), upload your .dat file
 *      and continue to the Validate plan page, then open the SCHEMAS tab. Make
 *      sure "All Changes" is visible (the default) — collapsed sections are
 *      still read correctly, but the panel itself must be present.
 *   2. Open the browser devtools console and paste this entire file — or click
 *      the bookmarklet (see below).
 *   3. A status panel appears summarizing the material changes, with a Copy
 *      button. The same material rows are also highlighted in place on the real
 *      page (material = colored left border, noise = dimmed), so you can scroll
 *      the actual plan with the noise visually stripped out.
 *
 * Options: set window.KenfigurePlanReviewConfig BEFORE pasting, e.g.
 *   window.KenfigurePlanReviewConfig = { maxPositionShift: 5 };
 *     maxPositionShift — treat position/index shifts of 1..N as benign.
 *                        Default is unlimited (any position/index shift is
 *                        ignored) - unlike filter_import_plan.py's CLI default
 *                        of 1, since reviewing a plan interactively you almost
 *                        always want position noise out of the way; set a
 *                        finite value here to see shifts above N as material.
 *
 * This script runs entirely in your browser tab, read-only: it makes no network
 * requests, reads no credentials, and does not change any dropdown selection —
 * it only reads text already on the page and adds highlighting styles.
 *
 * Bookmarklet distribution: `make bookmarklet-plan-review` (which runs
 * scripts/build_plan_review_bookmarklet.mjs) packages this file into a
 * drag-to-install bookmarklet page, same pattern as CM Update All.
 *
 * DOM selectors current as of the August 2026 config-migration UI. The plan is
 * read from section[aria-label="All Changes"] specifically — "High Impact
 * Change Highlights" is a curated subset of the same entries and would double
 * count if included.
 */
(() => {
  'use strict';

  // Bump on every behavior change; shown in the panel, the console, and on the
  // bookmarklet install page so stale copies are identifiable.
  const PLAN_REVIEW_VERSION = 1;

  const config = Object.assign(
    { maxPositionShift: Infinity },
    window.KenfigurePlanReviewConfig || {},
  );

  const ALL_CHANGES_SELECTOR = 'section[aria-label="All Changes"]';

  // ---- Ported from scripts/filter_import_plan.py — keep in sync. ----

  // Longest-first so "unit type" matches before "unit", "entity schema" before
  // a hypothetical "entity", etc.
  const OBJECT_TYPES = [
    'custom fieldset',
    'entity schema',
    'result schema',
    'location schema',
    'container schema',
    'study schema',
    'box schema',
    'plate schema',
    'unit type',
    'dropdown',
    'unit',
  ];
  const FIELDSET_RE = /^(Creating|Removing) FieldsetConfig (.+)$/;
  const VALIDATION_RULE_RE = /^(Creating|Removing) ValidationRule (.+)$/;
  const FIELD_POSITION_RE = /^Updating .+: position changed from (\d+) to (\d+)$/;
  const OPTION_INDEX_RE = /^Updating options: .+ changed from (\d+) to (\d+)$/;
  const PROPERTY_CHANGE_RE = /(?:changed from\b|:\s+\S+\s+as\s+)/;

  // Object kinds whose Create+Remove pairs (within the same object) are
  // identifier reminting, not a material change: [regex, filter reason].
  const REPLACE_PAIR_KINDS = [
    [FIELDSET_RE, 'fieldset_replace'],
    [VALIDATION_RULE_RE, 'validationrule_replace'],
  ];

  function objectNameFromRoot(text) {
    const rest = text.startsWith('Updating ') ? text.slice('Updating '.length) : text;
    for (const typ of OBJECT_TYPES) {
      const prefix = `${typ} `;
      if (rest.startsWith(prefix)) return rest.slice(prefix.length);
    }
    return rest;
  }

  function isBenignShift(text, maxShift) {
    const match = FIELD_POSITION_RE.exec(text) || OPTION_INDEX_RE.exec(text);
    if (!match) return false;
    const delta = Math.abs(parseInt(match[1], 10) - parseInt(match[2], 10));
    return delta > 0 && delta <= maxShift;
  }

  function classifyUpdating(text, maxShift) {
    if (isBenignShift(text, maxShift)) return 'position';
    return PROPERTY_CHANGE_RE.test(text) ? 'issue' : 'identifier';
  }

  function classifyDetailLine(text, maxShift) {
    if (REPLACE_PAIR_KINDS.some(([re]) => re.test(text))) return 'replace_pending';
    if (text === 'Creating Identifier') return 'identifier_create';
    if (text.startsWith('Updating ')) return classifyUpdating(text, maxShift);
    return 'issue';
  }

  // Pair FieldsetConfig/ValidationRule create/remove lines within a single
  // object's own detail lines. DOM structure already scopes details to their
  // object, so — unlike the flat-text version, which had to approximate block
  // boundaries — this pairing is exact.
  function pairReplaceable(texts, kinds) {
    for (const [regex, reason] of REPLACE_PAIR_KINDS) {
      const byName = new Map();
      texts.forEach((text, i) => {
        if (kinds[i] !== 'replace_pending') return;
        const match = regex.exec(text);
        if (!match) return;
        const [, action, name] = match;
        if (!byName.has(name)) byName.set(name, { Creating: [], Removing: [] });
        byName.get(name)[action].push(i);
      });
      for (const { Creating, Removing } of byName.values()) {
        const n = Math.min(Creating.length, Removing.length);
        for (let i = 0; i < n; i++) {
          kinds[Creating[i]] = reason;
          kinds[Removing[i]] = reason;
        }
      }
    }
    // Unpaired FieldsetConfig/ValidationRule lines are material.
    kinds.forEach((k, i) => {
      if (k === 'replace_pending') kinds[i] = 'issue';
    });
  }

  // ---- DOM extraction ----

  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim();

  function lineTextOf(container) {
    const span = container.querySelector(':scope > span') || container.querySelector('span');
    return normalize(span ? span.textContent : '');
  }

  // Returns [{ name, objects: [{ name, rootEl, rootText, rootKind,
  //   details: [{ el, text, kind }] }] }] or null if the panel isn't present.
  function extractPlan(maxShift) {
    const panel = document.querySelector(ALL_CHANGES_SELECTOR);
    if (!panel) return null;

    const sections = [];
    let current = null;
    const nodes = panel.querySelectorAll(
      '[data-testid="LogContainer-header"], [data-testid="LogMessage-root"]',
    );
    nodes.forEach((el) => {
      if (el.matches('[data-testid="LogContainer-header"]')) {
        current = { name: normalize(el.textContent), objects: [] };
        sections.push(current);
        return;
      }
      if (!current) {
        current = { name: '(no section)', objects: [] };
        sections.push(current);
      }
      const rootWrapper = el.querySelector(':scope > div.u-flex-display') || el;
      const rootText = lineTextOf(rootWrapper);
      const detailDivs = [...el.querySelectorAll(':scope > [data-test-element="detail"]')];
      const detailTexts = detailDivs.map(lineTextOf);
      const detailKinds = detailTexts.map((t) => classifyDetailLine(t, maxShift));
      pairReplaceable(detailTexts, detailKinds);
      const details = detailDivs.map((el2, i) => ({ el: el2, text: detailTexts[i], kind: detailKinds[i] }));
      current.objects.push({
        name: objectNameFromRoot(rootText),
        rootEl: el,
        rootText,
        rootKind: rootText.startsWith('Updating ') ? classifyUpdating(rootText, maxShift) : 'issue',
        details,
      });
    });
    return sections;
  }

  // ---- Reporting + in-place highlighting ----

  function buildSummary(sections) {
    const counts = {};
    let total = 0;
    let issueCount = 0;
    const issueRows = []; // { loc, text }
    for (const sec of sections) {
      for (const obj of sec.objects) {
        total += 1;
        counts[obj.rootKind] = (counts[obj.rootKind] || 0) + 1;
        if (obj.rootKind === 'issue') {
          issueCount += 1;
          issueRows.push({ loc: `${sec.name} / ${obj.name}`, text: obj.rootText });
        }
        for (const d of obj.details) {
          total += 1;
          counts[d.kind] = (counts[d.kind] || 0) + 1;
          if (d.kind === 'issue') {
            issueCount += 1;
            issueRows.push({ loc: `${sec.name} / ${obj.name}`, text: d.text });
          }
        }
      }
    }
    return { counts, total, issueCount, issueRows };
  }

  function renderReportText(summary) {
    const { counts, total, issueCount, issueRows } = summary;
    const filtered = total - issueCount;
    const reasons = ['identifier', 'position', 'fieldset_replace', 'validationrule_replace', 'identifier_create'];
    const breakdown = reasons
      .filter((r) => counts[r])
      .map((r) => `${r} ${counts[r]}`)
      .join(', ');
    const out = [
      `# Kenfigure Plan Review v${PLAN_REVIEW_VERSION} — ${window.location.hostname}`,
      `# ${total} lines | ${filtered} filtered${breakdown ? ` (${breakdown})` : ''} | ${issueCount} remaining`,
      '',
    ];
    if (issueCount === 0) {
      out.push('# No material differences.');
      return out.join('\n');
    }
    let currentLoc = null;
    for (const row of issueRows) {
      if (row.loc !== currentLoc) {
        if (currentLoc !== null) out.push('');
        out.push(`## ${row.loc}`);
        currentLoc = row.loc;
      }
      out.push(`  ${row.text}`);
    }
    out.push('', `# ${issueCount} issue line(s) remain`);
    return out.join('\n');
  }

  const STYLE_ID = 'kenfigure-plan-review-style';
  function ensureHighlightStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .kf-plan-issue { outline: 2px solid #d64545 !important; outline-offset: -1px;
        background: rgba(214,69,69,0.08) !important; border-radius: 4px; }
      .kf-plan-noise { opacity: 0.4; }
    `;
    document.head.appendChild(style);
  }

  function clearHighlights() {
    document.querySelectorAll('.kf-plan-issue, .kf-plan-noise').forEach((el) => {
      el.classList.remove('kf-plan-issue', 'kf-plan-noise');
    });
    document.getElementById(STYLE_ID)?.remove();
  }

  function applyHighlights(sections) {
    ensureHighlightStyles();
    for (const sec of sections) {
      for (const obj of sec.objects) {
        obj.rootEl.classList.add(obj.rootKind === 'issue' ? 'kf-plan-issue' : 'kf-plan-noise');
        for (const d of obj.details) {
          d.el.classList.add(d.kind === 'issue' ? 'kf-plan-issue' : 'kf-plan-noise');
        }
      }
    }
  }

  // ---- Overlay panel (same visual pattern as CM Update All) ----

  function createOverlay(reportText, summary) {
    const ID = 'kenfigure-plan-review-overlay';
    document.getElementById(ID)?.remove();
    const box = document.createElement('div');
    box.id = ID;
    box.style.cssText =
      'position:fixed;right:16px;bottom:16px;z-index:2147483647;width:420px;' +
      'max-height:70vh;display:flex;flex-direction:column;background:#fff;' +
      'color:#1a1a2e;border:1px solid #c7c7d1;border-radius:8px;' +
      'box-shadow:0 4px 24px rgba(0,0,0,.25);' +
      'font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:left;';

    const header = document.createElement('div');
    header.style.cssText =
      'display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #e3e3ea;font-weight:600;';
    const title = document.createElement('span');
    title.textContent = `Kenfigure — Plan Review v${PLAN_REVIEW_VERSION}`;
    title.style.cssText = 'flex:1;';
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.textContent = 'Copy';
    copyBtn.style.cssText =
      'padding:2px 10px;border:1px solid #c7c7d1;border-radius:6px;background:#fff;cursor:pointer;font:inherit;';
    copyBtn.onclick = () => {
      navigator.clipboard.writeText(reportText).then(
        () => {
          copyBtn.textContent = 'Copied!';
          setTimeout(() => (copyBtn.textContent = 'Copy'), 1500);
        },
        () => {
          copyBtn.textContent = 'Copy failed';
        },
      );
    };
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.textContent = '×';
    closeBtn.title = 'Close (also clears highlighting on the page)';
    closeBtn.style.cssText =
      'border:none;background:none;font-size:16px;cursor:pointer;line-height:1;padding:0 2px;color:inherit;';
    closeBtn.onclick = () => {
      clearHighlights();
      box.remove();
    };
    header.append(title, copyBtn, closeBtn);

    const summaryLine = document.createElement('div');
    summaryLine.style.cssText = 'padding:8px 12px;color:#66667a;border-bottom:1px solid #e3e3ea;';
    const filtered = summary.total - summary.issueCount;
    summaryLine.textContent =
      `${summary.total} lines · ${filtered} filtered · ${summary.issueCount} remaining`;

    const body = document.createElement('pre');
    body.style.cssText =
      'margin:0;padding:10px 12px;overflow:auto;white-space:pre-wrap;word-break:break-word;flex:1;font:12px/1.5 ui-monospace,monospace;';
    body.textContent =
      summary.issueCount === 0
        ? 'No material differences.'
        : summary.issueRows
            .reduce((lines, row, i, arr) => {
              if (i === 0 || arr[i - 1].loc !== row.loc) lines.push(`\n${row.loc}`);
              lines.push(`  ${row.text}`);
              return lines;
            }, [])
            .join('\n')
            .trim();

    box.append(header, summaryLine, body);
    document.body.appendChild(box);
  }

  function showError(message) {
    const ID = 'kenfigure-plan-review-overlay';
    document.getElementById(ID)?.remove();
    const box = document.createElement('div');
    box.id = ID;
    box.style.cssText =
      'position:fixed;right:16px;bottom:16px;z-index:2147483647;width:320px;padding:12px 14px;' +
      'background:#fff;color:#b00020;border:1px solid #c7c7d1;border-radius:8px;' +
      'box-shadow:0 4px 24px rgba(0,0,0,.25);font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;';
    box.textContent = message;
    document.body.appendChild(box);
  }

  function main() {
    const sections = extractPlan(config.maxPositionShift);
    if (!sections) {
      const msg =
        '"All Changes" panel not found. Make sure you are on the Validate plan ' +
        'page, on the SCHEMAS tab.';
      console.log(`KenfigurePlanReview: ${msg}`);
      showError(msg);
      return;
    }
    const summary = buildSummary(sections);
    const reportText = renderReportText(summary);
    console.log(reportText);
    applyHighlights(sections);
    createOverlay(reportText, summary);
  }

  main();
})();
