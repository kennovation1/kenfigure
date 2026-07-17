/**
 * Kenfigure — Configuration Migration "Update All" utility
 * =========================================================
 *
 * Bulk-flips every "Create" action to "Update <same-named object>" on the
 * Plan step of Benchling's Configuration Migration import UI
 * (https://<tenant>.benchling.com/config-migration/import).
 *
 * Why: after a Kenfigure round trip (Benchling export -> Kenfigure Tool export
 * -> Kenfigure Tool import), the internal identifiers in the resulting .dat
 * file are recreated, so Benchling cannot definitively match objects to their
 * originals and conservatively defaults every action to "Create". This script
 * selects the matching "Update <name>" menu entry for each row so you don't
 * have to click hundreds of dropdowns. After one such import, the identifiers
 * match again and Benchling selects "Update" on its own — this tool is only
 * needed for the first round trip.
 *
 * Usage (full instructions: docs/cm-bulk-update.md):
 *   1. In the import wizard ("new migration experience"), upload your .dat
 *      file and continue to the Validate plan page, then open the SCHEMAS tab.
 *      Make sure the sections you care about are expanded (the default).
 *   2. Open the browser devtools console and paste this entire file — or click
 *      the bookmarklet (see below). Progress appears in a status box on the
 *      page as well as in the console.
 *   3. Repeat on other tabs if needed.
 *
 * Controls (while running):
 *   Stop button in the on-page status box, or KenfigureCM.stop() in the console.
 *
 * Options: set window.KenfigureCMConfig BEFORE pasting, e.g.
 *   window.KenfigureCMConfig = { dryRun: true };
 *     dryRun           — log what would be selected; change nothing (default false)
 *     requireNameMatch — only accept an exact "Update <row name>" entry; if the
 *                        name can't be matched, skip the row instead of falling
 *                        back to the first "Update ..." option (default false)
 *     stepDelayMs      — pause between rows, ms (default 150)
 *     menuTimeoutMs    — max wait for a menu to open/close, ms (default 5000)
 *
 * This script runs entirely in your browser tab. It makes no network requests
 * and reads no credentials; it only simulates the clicks you would make.
 *
 * Bookmarklet distribution: `make bookmarklet` (which runs
 * scripts/build_bookmarklet.mjs) packages this file into
 * dist/cm-update-all-bookmarklet.html — a page with drag-to-install
 * bookmarklet buttons (normal and dry-run variants).
 *
 * DOM selectors current as of the July 2026 config-migration UI.
 */
(() => {
  'use strict';

  // Bump on every behavior change; shown in the status box, the console, and
  // on the bookmarklet install page so stale copies are identifiable.
  const CM_VERSION = 1;

  if (window.KenfigureCM?.running) {
    console.warn('KenfigureCM: already running. Call KenfigureCM.stop() and wait before restarting.');
    return;
  }

  const config = Object.assign(
    {
      dryRun: false,
      requireNameMatch: false,
      stepDelayMs: 150,
      menuTimeoutMs: 5000,
      maxAttemptsPerRow: 2,
    },
    window.KenfigureCMConfig || {},
  );

  const SEL = {
    trigger: 'button.selectDropdown-button',
    triggerText: '.selectDropdown-text',
    dropdownRoot: '[data-test-component="SelectDropdown"]',
    menu: '[data-test-component="AbsoluteDropdownContainer"]',
    option: 'a.menu-option, .menu-option',
  };

  const state = { running: true, stopRequested: false };
  window.KenfigureCM = {
    get running() {
      return state.running;
    },
    stop() {
      state.stopRequested = true;
      console.log('KenfigureCM: stop requested — finishing current row...');
    },
  };

  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));
  const normalize = (s) => (s || '').replace(/\s+/g, ' ').trim();

  // On-page status box, so bookmarklet users get progress and results without
  // opening the console. All console logging is kept as well.
  function createOverlay() {
    const ID = 'kenfigure-cm-overlay';
    document.getElementById(ID)?.remove();
    const box = document.createElement('div');
    box.id = ID;
    box.style.cssText =
      'position:fixed;right:16px;bottom:16px;z-index:2147483647;width:320px;' +
      'max-height:60vh;display:flex;flex-direction:column;background:#fff;' +
      'color:#1a1a2e;border:1px solid #c7c7d1;border-radius:8px;' +
      'box-shadow:0 4px 24px rgba(0,0,0,.25);' +
      'font:13px/1.45 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:left;';

    const header = document.createElement('div');
    header.style.cssText =
      'display:flex;align-items:center;gap:8px;padding:10px 12px;border-bottom:1px solid #e3e3ea;font-weight:600;';
    const title = document.createElement('span');
    title.textContent =
      `Kenfigure — CM Update All v${CM_VERSION}` + (config.dryRun ? ' (dry run)' : '');
    title.style.cssText = 'flex:1;';
    const stopBtn = document.createElement('button');
    stopBtn.type = 'button';
    stopBtn.textContent = 'Stop';
    stopBtn.style.cssText =
      'padding:2px 10px;border:1px solid #c7c7d1;border-radius:6px;background:#fff;cursor:pointer;font:inherit;';
    stopBtn.onclick = () => {
      stopBtn.disabled = true;
      stopBtn.textContent = 'Stopping...';
      window.KenfigureCM.stop();
    };
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.textContent = '×';
    closeBtn.title = 'Close';
    closeBtn.style.cssText =
      'border:none;background:none;font-size:16px;cursor:pointer;line-height:1;padding:0 2px;color:inherit;';
    closeBtn.onclick = () => {
      if (state.running) window.KenfigureCM.stop();
      box.remove();
    };
    header.append(title, stopBtn, closeBtn);

    const status = document.createElement('div');
    status.style.cssText = 'padding:8px 12px 0;';
    const detail = document.createElement('div');
    detail.style.cssText = 'padding:2px 12px 10px;color:#66667a;min-height:1.2em;';
    const failWrap = document.createElement('div');
    failWrap.style.cssText = 'display:none;padding:0 12px 10px;overflow-y:auto;';
    const failTitle = document.createElement('div');
    failTitle.textContent = 'Needs manual attention:';
    failTitle.style.fontWeight = '600';
    const failList = document.createElement('ul');
    failList.style.cssText = 'margin:4px 0 0;padding-left:18px;';
    failWrap.append(failTitle, failList);

    box.append(header, status, detail, failWrap);
    document.body.appendChild(box);

    return {
      setStatus: (t) => {
        status.textContent = t;
      },
      setDetail: (t) => {
        detail.textContent = t;
      },
      addFailure: (t) => {
        failWrap.style.display = 'block';
        const li = document.createElement('li');
        li.textContent = t;
        failList.appendChild(li);
      },
      finish: (t) => {
        status.textContent = t;
        status.style.fontWeight = '600';
        stopBtn.remove();
      },
    };
  }

  async function waitFor(getValue, timeoutMs, pollMs = 50) {
    const deadline = Date.now() + timeoutMs;
    for (;;) {
      const value = getValue();
      if (value) return value;
      if (Date.now() > deadline) return null;
      await sleep(pollMs);
    }
  }

  function triggerValue(btn) {
    return normalize(btn.querySelector(SEL.triggerText)?.textContent ?? btn.textContent);
  }

  // The object name for a row is the text that immediately precedes the row's
  // dropdown. Walk up from the trigger; at each ancestor, take the last text
  // node that comes before this dropdown in document order, resetting whenever
  // another dropdown intervenes — so in a container shared by many rows we
  // still pick this row's own label, never a neighbor's.
  function rowLabel(btn) {
    const dropdown = btn.closest(SEL.dropdownRoot) || btn;
    for (let node = dropdown.parentElement; node && node !== document.body; node = node.parentElement) {
      let best = null;
      const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
      let textNode;
      while ((textNode = walker.nextNode())) {
        const pos = dropdown.compareDocumentPosition(textNode);
        if (!(pos & Node.DOCUMENT_POSITION_PRECEDING)) break;
        if (textNode.parentElement?.closest(SEL.dropdownRoot)) {
          best = null; // text belongs to an earlier row's dropdown
          continue;
        }
        const text = normalize(textNode.textContent);
        if (text.length > 1) best = text;
      }
      if (best) return best;
    }
    return null;
  }

  // Scan for the next unprocessed "Create" dropdown. Keys are label + the
  // occurrence index within this scan, so rows that share a name across
  // sections don't shadow each other.
  function findNextCreateTrigger(attempts) {
    const seen = new Map();
    for (const btn of document.querySelectorAll(SEL.trigger)) {
      if (triggerValue(btn) !== 'Create') continue;
      const label = rowLabel(btn);
      const n = seen.get(label) ?? 0;
      seen.set(label, n + 1);
      const key = `${label}#${n}`;
      if ((attempts.get(key) ?? 0) >= config.maxAttemptsPerRow) continue;
      return { btn, label, key };
    }
    return null;
  }

  // A synthetic Escape does not close Benchling's menu, so close it the way it
  // was opened — toggle-click the row's trigger — with an outside click as the
  // second attempt.
  async function closeMenu(btn, menu) {
    const closed = () => !document.contains(menu);
    btn.click();
    if (await waitFor(closed, 800)) return;
    for (const type of ['mousedown', 'mouseup', 'click']) {
      document.body.dispatchEvent(new MouseEvent(type, { bubbles: true }));
    }
    await waitFor(closed, 800);
  }

  function remainingCreateCount() {
    return [...document.querySelectorAll(SEL.trigger)].filter((b) => triggerValue(b) === 'Create').length;
  }

  async function processRow({ btn, label }) {
    const name = label ?? '(unlabeled row)';

    btn.scrollIntoView({ block: 'center', behavior: 'instant' });
    await sleep(config.stepDelayMs);
    // Snapshot menus already in the DOM so a leftover from a failed close can
    // never be mistaken for the menu this click opens.
    const stale = new Set(document.querySelectorAll(SEL.menu));
    btn.click();

    const menu = await waitFor(() => {
      const fresh = [...document.querySelectorAll(SEL.menu)].filter(
        (m) => !stale.has(m) && m.querySelector(SEL.option),
      );
      return fresh.pop() ?? null;
    }, config.menuTimeoutMs);
    if (!menu) return { ok: false, name, reason: 'dropdown menu never opened' };

    const updates = [...menu.querySelectorAll(SEL.option)].filter((o) =>
      /^update\b/i.test(normalize(o.textContent)),
    );

    let how = 'name match';
    let target = label
      ? updates.find(
          (o) => normalize(o.textContent).toLowerCase() === `update ${label}`.toLowerCase(),
        )
      : null;
    if (!target && !config.requireNameMatch) {
      // Benchling puts the matching object first among the Update entries.
      target = updates[0];
      how = 'first Update option';
    }
    if (!target) {
      await closeMenu(btn, menu);
      return {
        ok: false,
        name,
        reason: updates.length ? 'no exact "Update <name>" entry' : 'no Update entries in menu',
      };
    }

    const choice = normalize(target.textContent);
    if (config.dryRun) {
      await closeMenu(btn, menu);
      return { ok: true, name, choice, how, dryRun: true };
    }

    target.click();
    await waitFor(() => !document.contains(menu), config.menuTimeoutMs);
    // React may have replaced the button node; if it is gone, the re-scan
    // in the main loop is the source of truth.
    if (document.contains(btn) && triggerValue(btn) === 'Create') {
      return { ok: false, name, reason: `clicked "${choice}" but row still shows Create` };
    }
    return { ok: true, name, choice, how };
  }

  async function main() {
    const ui = createOverlay();
    const attempts = new Map();
    const failures = [];
    let done = 0;
    const verb = config.dryRun ? 'would update' : 'updated';

    const total = remainingCreateCount();
    if (total === 0) {
      const msg =
        'No "Create" dropdowns found on this page. Make sure you are on the ' +
        'Validate plan page, on the right tab, and sections are expanded.';
      console.log(`KenfigureCM: ${msg}`);
      ui.finish('Nothing to do');
      ui.setDetail(msg);
      return;
    }
    console.log(
      `KenfigureCM v${CM_VERSION}: found ${total} "Create" dropdown(s)${config.dryRun ? ' [DRY RUN]' : ''} — starting...`,
    );
    ui.setStatus(`0 / ${total} ${verb}`);

    let row;
    while ((row = findNextCreateTrigger(attempts))) {
      if (state.stopRequested) {
        console.log('KenfigureCM: stopped by user.');
        break;
      }
      ui.setDetail(`Processing "${row.label ?? '(unlabeled row)'}"...`);
      // Only failed (and dry-run) rows stay in the "Create" state, so only
      // they need attempt-tracking to avoid re-processing.
      const result = await processRow(row);
      if (result.ok) {
        done++;
        if (result.dryRun) attempts.set(row.key, config.maxAttemptsPerRow);
        console.log(
          `[${done}/${total}] ${result.dryRun ? 'would select' : '✓'} "${result.name}" → "${result.choice}" (${result.how})`,
        );
        ui.setStatus(`${done} / ${total} ${verb}`);
        ui.setDetail(`✓ "${result.name}" → "${result.choice}"`);
      } else {
        attempts.set(row.key, (attempts.get(row.key) ?? 0) + 1);
        if ((attempts.get(row.key) ?? 0) >= config.maxAttemptsPerRow) {
          failures.push(result);
          console.warn(`✗ "${result.name}" — ${result.reason} (giving up)`);
          ui.addFailure(`${result.name}: ${result.reason}`);
        } else {
          console.warn(`✗ "${result.name}" — ${result.reason} (will retry)`);
        }
      }
      await sleep(config.stepDelayMs);
    }

    console.log(`\nKenfigureCM done: ${verb} ${done}, failed ${failures.length}.`);
    if (failures.length) {
      console.log('Fix these rows manually:');
      for (const f of failures) console.log(`  - ${f.name}: ${f.reason}`);
    }
    const stopped = state.stopRequested ? ' (stopped early)' : '';
    ui.finish(`Done${stopped}: ${verb} ${done} of ${total}, failed ${failures.length}`);
    ui.setDetail('');

    const left = remainingCreateCount();
    if (!config.dryRun && !state.stopRequested && left > failures.length) {
      const note = `${left} "Create" row(s) remain — some sections may have been collapsed. Expand them and rerun; already-updated rows are untouched.`;
      console.log(note);
      ui.setDetail(note);
    }
  }

  main()
    .catch((err) => {
      console.error('KenfigureCM: unexpected error —', err);
      const box = document.getElementById('kenfigure-cm-overlay');
      if (box) box.firstChild.after(Object.assign(document.createElement('div'), {
        textContent: `Unexpected error: ${err?.message ?? err} (details in console)`,
        style: 'padding:8px 12px;color:#b00020;',
      }));
    })
    .finally(() => {
      state.running = false;
    });
})();
