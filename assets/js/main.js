/* Desktag Marketing Site — Local-only progressive interactivity.
   No cookies, no localStorage, no analytics, zero network requests. */

(() => {
  'use strict';

  /* ------------------------------------------------------------------
     1. Appearance toggle (in-memory only — no cookies or storage)
     ------------------------------------------------------------------ */
  const themeBtn = document.querySelector('[data-theme-toggle]');
  if (themeBtn) {
    const prefersDark = () =>
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    const currentTheme = () => {
      const explicit = document.documentElement.getAttribute('data-theme');
      if (explicit === 'dark' || explicit === 'light') return explicit;
      return prefersDark() ? 'dark' : 'light';
    };

    const syncThemeButton = () => {
      const isDark = currentTheme() === 'dark';
      themeBtn.setAttribute('aria-label', isDark ? 'Switch to light appearance' : 'Switch to dark appearance');
      themeBtn.setAttribute('title', isDark ? 'Switch to light appearance' : 'Switch to dark appearance');
      themeBtn.innerHTML = isDark
        ? '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>'
        : '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
    };

    syncThemeButton();
    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', syncThemeButton);
    }
    themeBtn.addEventListener('click', () => {
      const next = currentTheme() === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      syncThemeButton();
    });
  }

  /* ------------------------------------------------------------------
     2. Mobile Navigation Drawer
     ------------------------------------------------------------------ */
  const navToggle = document.querySelector('[data-nav-toggle]');
  const siteNav = document.querySelector('[data-site-nav]');
  if (navToggle && siteNav) {
    navToggle.addEventListener('click', () => {
      const open = siteNav.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    siteNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ------------------------------------------------------------------
     3. Unconfigured App Store placeholder guard (local preview polish)
     ------------------------------------------------------------------ */
  const showToast = (msg) => {
    let el = document.querySelector('.site-toast');
    if (!el) {
      el = document.createElement('div');
      el.className = 'site-toast';
      el.setAttribute('role', 'status');
      el.setAttribute('aria-live', 'polite');
      document.body.appendChild(el);
    }
    el.textContent = msg;
    el.classList.add('is-open');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('is-open'), 4200);
  };

  document.querySelectorAll('a[href="APP_STORE_URL"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      showToast('Desktag is coming soon to the Mac App Store.');
    });
  });

  /* ------------------------------------------------------------------
     4. Hero Interactive macOS Desktop Playground
     ------------------------------------------------------------------ */
  const stage = document.querySelector('[data-desktag-stage]');
  if (stage) {
    const DESKTOPS = [
      {
        id: 1,
        name: 'Mail & Calendar',
        emoji: '📬',
        color: '#2980f5',
        lit: '#1c6be3',
        app: 'Mail',
        kicker: 'Desktop 1',
        lastSeen: 'Now',
        hotkey: '⌃⌥1',
        marks: [],
        note: '',
        status: null,
        windows: [
          { label: 'Mail · Inbox — 3 unread', sub: 'Dana Chen · Thursday design review' },
          { label: 'Calendar · November', sub: '2 events today' }
        ]
      },
      {
        id: 2,
        name: 'Build',
        emoji: '🛠️',
        color: '#f58521',
        lit: '#c44a03',
        app: 'Xcode',
        kicker: 'Desktop 2 · Noted 3 days ago',
        lastSeen: '2 minutes ago',
        hotkey: '⌃⌥2',
        marks: ['star', 'flag'],
        note: 'Fix the widget’s signing, then send the 1.2 build to testers.',
        status: { kind: 'attention', text: 'Stopped 2 minutes ago · Claude Code' },
        windows: [
          { label: 'Claude Code · Stopped 2m ago', sub: 'Fix signing on the widget target' },
          { label: 'Ghostty · ~/code/desktag', sub: '331 tests passed' },
          { label: 'Xcode · SpaceEngine.swift', sub: 'Desktag' }
        ]
      },
      {
        id: 3,
        name: 'Design',
        emoji: '🎨',
        color: '#ed4d8f',
        lit: '#c9296e',
        app: 'Sketch',
        kicker: 'Desktop 3 · Noted yesterday',
        lastSeen: '1 hour ago',
        hotkey: '⌃⌥3',
        marks: ['heart'],
        note: 'Export the onboarding screens at 2× and check contrast in both modes.',
        status: null,
        windows: [
          { label: 'Mockups · Onboarding Flow', sub: 'Export 2× ready' },
          { label: 'Preview · AppIcon.png', sub: '1024 × 1024' }
        ]
      },
      {
        id: 4,
        name: 'Research',
        emoji: '',
        color: '#a357db',
        lit: '#8c40c9',
        app: 'Ghostty',
        kicker: 'Desktop 4',
        lastSeen: '18 minutes ago',
        hotkey: '⌃⌥4',
        marks: [],
        note: '',
        status: { kind: 'working', text: 'Codex · Working for 4 minutes' },
        windows: [
          { label: 'Codex · Working (4m)', sub: 'Summarise AppKit transition benchmarks' },
          { label: 'Safari · Apple Developer Docs', sub: 'NSWindow.isOnActiveSpace' },
          { label: 'Notes · Release checklist', sub: 'Edited today' }
        ]
      },
      {
        id: 5,
        name: 'Team',
        emoji: '💬',
        color: '#38ad54',
        lit: '#1a8036',
        app: 'Messages',
        kicker: 'Desktop 5 · Noted 3 days ago',
        lastSeen: '45 minutes ago',
        hotkey: '⌃⌥5',
        marks: [],
        note: 'Reply to Dana about Thursday’s TestFlight build.',
        status: null,
        windows: [
          { label: 'Messages · Dana Chen', sub: 'Uploaded the 2× onboarding exports' },
          { label: 'Finder · ~/Desktop/Assets', sub: '12 items' }
        ]
      }
    ];

    let activeId = 2;
    let previousId = 1;
    let layout = 'bar';
    let hoverTimer = null;
    let switcherOpen = false;
    let switcherIdx = 0;

    const screenEl = stage.querySelector('[data-mac-screen]');
    const workspaceEl = stage.querySelector('[data-mac-workspace]');
    const menuAppEl = stage.querySelector('[data-menu-app]');
    const menuNumEl = stage.querySelector('[data-menu-num]');
    const menuNameEl = stage.querySelector('[data-menu-name]');
    const hoverCardEl = stage.querySelector('[data-hover-card]');
    const switcherBackdrop = stage.querySelector('[data-switcher-backdrop]');
    const switcherInput = stage.querySelector('[data-switcher-input]');
    const switcherResults = stage.querySelector('[data-switcher-results]');
    const layoutButtons = stage.querySelectorAll('[data-layout-btn]');

    const markGlyph = (m) => {
      if (m === 'star') return '<span class="mark-dot mark-star" title="Star" aria-hidden="true">★</span>';
      if (m === 'flag') return '<span class="mark-dot mark-flag" title="Flag" aria-hidden="true">⚑</span>';
      if (m === 'heart') return '<span class="mark-dot mark-heart" title="Heart" aria-hidden="true">♥</span>';
      return '';
    };

    const renderTagButton = (d, extraClass = '') => {
      const isCurrent = d.id === activeId;
      const isPrev = d.id === previousId && !isCurrent;
      const marksHtml = d.marks.length
        ? `<span class="tag-marks">${d.marks.map(markGlyph).join('')}</span>`
        : '';
      const attentionHtml =
        d.status && d.status.kind === 'attention' && !isCurrent
          ? '<span class="tag-attention" title="Work stopped — click to inspect"></span>'
          : '';
      const backHtml = isPrev ? '<span class="tag-back-icon" title="Previous desktop">↩</span>' : '';
      const workHtml =
        d.status && d.status.kind === 'working'
          ? '<span class="tag-work-bar" aria-hidden="true"></span>'
          : '';

      return `
        <button type="button"
          class="sticker-tag ${extraClass}"
          data-desk-btn="${d.id}"
          aria-pressed="${isCurrent}"
          style="--tag-color:${d.color};--tag-lit:${d.lit}">
          <span class="tag-badge" aria-hidden="true">${d.id}${attentionHtml}${backHtml}</span>
          ${d.emoji ? `<span class="tag-emoji" aria-hidden="true">${d.emoji}</span>` : ''}
          <span class="tag-name">${d.name}</span>
          ${marksHtml}
          ${workHtml}
        </button>`;
    };

    const showHoverCard = (id) => {
      if (!hoverCardEl || switcherOpen) return;
      const d = DESKTOPS.find((x) => x.id === id);
      if (!d) return;
      hoverCardEl.style.setProperty('--hc-accent', d.color);
      hoverCardEl.innerHTML = `
        <div class="hc-top">
          <span class="hc-kicker">Desktop ${d.id} · ${d.id === activeId ? 'You are here' : d.lastSeen}</span>
          <span class="hc-key">${d.hotkey}</span>
        </div>
        <div class="hc-title">${d.emoji ? d.emoji + ' ' : ''}${d.name}</div>
        ${d.note ? `<p class="hc-note">${d.note}</p>` : ''}
        <div class="hc-divider"></div>
        <ul class="hc-list">
          ${d.windows
            .map((w) => `<li><span>${w.label}</span><span class="hc-sub">${w.sub}</span></li>`)
            .join('')}
        </ul>`;
      hoverCardEl.classList.add('is-visible');
    };

    const hideHoverCard = () => {
      if (hoverCardEl) hoverCardEl.classList.remove('is-visible');
    };

    const selectDesktop = (id) => {
      if (id === activeId) return;
      previousId = activeId;
      activeId = id;
      hideHoverCard();
      renderStage();
    };

    const renderArrivalCard = (d) => {
      const marksHtml = d.marks.length
        ? `<div class="arrival-marks">${d.marks.map(markGlyph).join('')}</div>`
        : '';
      const statusHtml = d.status
        ? `<div class="arrival-status-chip">
             <span class="${d.status.kind === 'working' ? 'status-pulse' : 'status-wait'}" aria-hidden="true"></span>
             <span>${d.status.text}</span>
           </div>`
        : '';

      return `
        <div class="arrival-card" role="status" aria-live="polite">
          ${d.emoji
            ? `<div class="arrival-emoji" aria-hidden="true">${d.emoji}</div>`
            : `<div class="arrival-badge-lg" aria-hidden="true">${d.id}</div>`}
          <div class="arrival-kicker">${d.kicker}</div>
          <div class="arrival-name">${d.name}</div>
          ${marksHtml}
          ${d.note ? `<p class="arrival-note">${d.note}</p>` : ''}
          ${statusHtml}
        </div>`;
    };

    const renderStage = () => {
      const active = DESKTOPS.find((d) => d.id === activeId) || DESKTOPS[1];

      // Update desktop tint and menu bar
      screenEl.style.setProperty('--desk-accent', active.color);
      screenEl.style.setProperty('--desk-lit', active.lit);
      if (menuAppEl) menuAppEl.textContent = active.app;
      if (menuNumEl) {
        const hasOtherAttention = activeId !== 2;
        menuNumEl.innerHTML = `${active.id}${hasOtherAttention ? '<span class="mac-status-dot" aria-hidden="true"></span>' : ''}`;
      }
      if (menuNameEl) {
        menuNameEl.textContent = `${active.emoji ? active.emoji + ' ' : ''}${active.name}`;
      }

      // Update mock background windows
      screenEl.querySelectorAll('[data-mock-desk]').forEach((w) => {
        w.classList.toggle('is-active', Number(w.getAttribute('data-mock-desk')) === activeId);
      });

      // Render active layout inside workspace
      let stickerHtml = '';
      let showArrival = true;

      if (layout === 'bar') {
        stickerHtml = `
          <div class="sticker-plate" role="toolbar" aria-label="Desktag Bar sticker">
            ${DESKTOPS.map((d) => renderTagButton(d)).join('')}
          </div>`;
      } else if (layout === 'stack') {
        stickerHtml = `
          <div class="sticker-plate is-stack" role="toolbar" aria-label="Desktag Stack sticker">
            ${DESKTOPS.map((d) => renderTagButton(d)).join('')}
            <button type="button" class="stack-footer" data-open-switcher>
              <span>Switch…</span>
              <kbd>⌃⌥D</kbd>
            </button>
          </div>`;
      } else if (layout === 'pill') {
        stickerHtml = `
          <div class="sticker-plate is-pill" role="toolbar" aria-label="Desktag Pill sticker">
            ${renderTagButton(active)}
          </div>`;
      } else if (layout === 'edge') {
        stickerHtml = `
          <div class="edge-stripes-wrap">
            <div class="edge-stripes" role="toolbar" aria-label="Edge-docked coloured stripes">
              ${DESKTOPS.map(
                (d) => `<button type="button" class="edge-stripe" data-desk-btn="${d.id}"
                  aria-label="Switch to Desktop ${d.id}: ${d.name}"
                  aria-pressed="${d.id === activeId}"
                  style="--tag-color:${d.color}"></button>`
              ).join('')}
            </div>
            <button type="button" class="done-banner" data-desk-btn="2">
              <span class="done-banner-badge">2<span class="done-check" aria-hidden="true">✓</span></span>
              <span class="done-banner-copy">
                <span class="done-banner-title">🛠️ Build · Pro done banner</span>
                <span class="done-banner-sub">Claude Code stopped after 3 minutes — click to jump there</span>
              </span>
            </button>
          </div>`;
      } else if (layout === 'canvas') {
        showArrival = false;
        const projects = [DESKTOPS[1], DESKTOPS[2], DESKTOPS[3]];
        const admin = [DESKTOPS[0], DESKTOPS[4]];
        stickerHtml = `
          <div class="canvas-board" role="region" aria-label="Spatial Canvas with coloured groups">
            <div class="canvas-board-head">
              <span>Desktops · Spatial Canvas (Pro)</span>
              <span>Clean Up · Undo</span>
            </div>
            <div class="canvas-group" style="--grp-c:#2980f5">
              <div class="canvas-group-label">Projects</div>
              <div class="canvas-group-row">
                ${projects.map((d) => renderTagButton(d, 'canvas-bubble')).join('')}
              </div>
            </div>
            <div class="canvas-group" style="--grp-c:#ed4d8f">
              <div class="canvas-group-label">Admin</div>
              <div class="canvas-group-row">
                ${admin.map((d) => renderTagButton(d, 'canvas-bubble')).join('')}
              </div>
            </div>
          </div>`;
      } else if (layout === 'freeform') {
        showArrival = true;
        const spots = [
          'top:1.1rem;left:1.3rem',
          'top:1.1rem;right:1.4rem',
          'bottom:3.3rem;left:1.5rem',
          'top:5.6rem;right:1.8rem',
          'bottom:3.3rem;right:1.5rem'
        ];
        stickerHtml = `
          <div class="freeform-layer" aria-label="No-Boundary Canvas floating bubbles">
            ${DESKTOPS.map(
              (d, i) => `<div class="freeform-pill" style="${spots[i]}">${renderTagButton(d)}</div>`
            ).join('')}
            <div class="freeform-hint">No-Boundary Canvas (Pro) — independent bubbles anywhere on screen, zero board behind them</div>
          </div>`;
      }

      workspaceEl.innerHTML = `${stickerHtml}${showArrival ? renderArrivalCard(active) : ''}`;

      // Wire tag clicks and hover cards
      workspaceEl.querySelectorAll('[data-desk-btn]').forEach((btn) => {
        const id = Number(btn.getAttribute('data-desk-btn'));
        btn.addEventListener('click', () => selectDesktop(id));
        if (btn.classList.contains('sticker-tag')) {
          btn.addEventListener('mouseenter', () => {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => showHoverCard(id), 180);
          });
          btn.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            hoverTimer = setTimeout(hideHoverCard, 220);
          });
        }
      });

      workspaceEl.querySelectorAll('[data-open-switcher]').forEach((btn) => {
        btn.addEventListener('click', openSwitcher);
      });
    };

    if (hoverCardEl) {
      hoverCardEl.addEventListener('mouseenter', () => clearTimeout(hoverTimer));
      hoverCardEl.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
        hoverTimer = setTimeout(hideHoverCard, 150);
      });
    }

    // Layout toolbar tabs
    layoutButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        layout = btn.getAttribute('data-layout-btn');
        layoutButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        hideHoverCard();
        renderStage();
      });
    });

    // Switcher modal (⌃⌥D)
    const getFilteredDesktops = (query) => {
      const q = query.trim().toLowerCase();
      if (!q) return DESKTOPS;
      return DESKTOPS.filter((d) => {
        const haystack = [
          String(d.id),
          d.name,
          d.note,
          d.app,
          d.marks.join(' '),
          d.status ? d.status.text : '',
          d.windows.map((w) => `${w.label} ${w.sub}`).join(' ')
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(q);
      });
    };

    const renderSwitcherRows = () => {
      const items = getFilteredDesktops(switcherInput.value);
      if (switcherIdx >= items.length) switcherIdx = Math.max(0, items.length - 1);
      if (!items.length) {
        switcherResults.innerHTML =
          '<div style="padding:1rem;text-align:center;color:rgba(255,255,255,0.6);font-size:0.86rem;">No matching desktop or window in sample workspace.</div>';
        return;
      }
      switcherResults.innerHTML = items
        .map((d, idx) => {
          const meta = d.status
            ? d.status.text
            : d.note || d.windows.map((w) => w.label).join(' · ');
          return `
            <button type="button" class="switcher-row ${idx === switcherIdx ? 'is-selected' : ''}" data-pick-desk="${d.id}">
              <span class="tag-badge" style="--tag-lit:${d.lit}">${d.id}</span>
              <span class="switcher-row-copy">
                <span class="switcher-row-name">${d.emoji ? d.emoji + ' ' : ''}${d.name}</span>
                <span class="switcher-row-meta">${meta}</span>
              </span>
              <span class="hc-key">${d.hotkey}</span>
            </button>`;
        })
        .join('');

      switcherResults.querySelectorAll('[data-pick-desk]').forEach((row) => {
        row.addEventListener('click', () => {
          selectDesktop(Number(row.getAttribute('data-pick-desk')));
          closeSwitcher();
        });
      });
    };

    const openSwitcher = () => {
      if (!switcherBackdrop) return;
      switcherOpen = true;
      switcherIdx = 0;
      hideHoverCard();
      switcherInput.value = '';
      switcherBackdrop.classList.add('is-open');
      switcherBackdrop.setAttribute('aria-hidden', 'false');
      renderSwitcherRows();
      setTimeout(() => switcherInput.focus(), 40);
    };

    const closeSwitcher = () => {
      if (!switcherBackdrop) return;
      switcherOpen = false;
      switcherBackdrop.classList.remove('is-open');
      switcherBackdrop.setAttribute('aria-hidden', 'true');
    };

    stage.querySelectorAll('[data-open-switcher]').forEach((btn) => {
      btn.addEventListener('click', openSwitcher);
    });

    if (switcherBackdrop && switcherInput) {
      switcherBackdrop.addEventListener('click', (e) => {
        if (e.target === switcherBackdrop) closeSwitcher();
      });
      switcherInput.addEventListener('input', () => {
        switcherIdx = 0;
        renderSwitcherRows();
      });
      switcherInput.addEventListener('keydown', (e) => {
        const items = getFilteredDesktops(switcherInput.value);
        if (e.key === 'Escape') {
          e.preventDefault();
          closeSwitcher();
        } else if (e.key === 'ArrowDown') {
          e.preventDefault();
          if (items.length) {
            switcherIdx = (switcherIdx + 1) % items.length;
            renderSwitcherRows();
          }
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          if (items.length) {
            switcherIdx = (switcherIdx - 1 + items.length) % items.length;
            renderSwitcherRows();
          }
        } else if (e.key === 'Enter') {
          e.preventDefault();
          if (!switcherInput.value.trim()) {
            selectDesktop(previousId);
            closeSwitcher();
          } else if (items[switcherIdx]) {
            selectDesktop(items[switcherIdx].id);
            closeSwitcher();
          }
        }
      });
    }

    renderStage();
  }

  /* ------------------------------------------------------------------
     5. Interactive 10-Screenshot Gallery + Lightbox
     ------------------------------------------------------------------ */
  const SHOTS = [
    {
      src: 'assets/shots/1-sticker.jpg',
      tier: 'Free',
      title: 'Know which desktop is which',
      desc: 'Floating sticker bar on Free: 3 named desktops, open apps on the rest, click any tag to switch at once.'
    },
    {
      src: 'assets/shots/2-agents.jpg',
      tier: 'Desktag Pro',
      title: 'Know the moment an agent stops',
      desc: 'Live running light under active desktops, attention dot and hover card when Claude Code, Codex or Gemini CLI stops or waits.'
    },
    {
      src: 'assets/shots/3-move.jpg',
      tier: 'Free',
      title: 'Drop a window on any desktop',
      desc: 'Drag a window onto any tag in the Stack or Bar: release to send it while you stay, or hold a moment to switch along.'
    },
    {
      src: 'assets/shots/4-switcher.jpg',
      tier: 'Free · Deep search in Pro',
      title: 'Type two letters, press Return',
      desc: 'Press ⌃⌥D anywhere to jump by name or mark, drill into windows with →, or deep-search folders, titles, agents and notes on Pro.'
    },
    {
      src: 'assets/shots/5-edge.jpg',
      tier: 'Free · Done banners in Pro',
      title: 'Hides at the edge until you need it',
      desc: 'Docks into coloured stripes along any screen edge. On Pro, a compact done banner slides out when work finishes out of sight.'
    },
    {
      src: 'assets/shots/6-canvas.jpg',
      tier: 'Desktag Pro',
      title: 'Arrange your desktops your way',
      desc: 'Spatial Canvas groups desktops into named coloured clusters; No-Boundary Canvas floats individual bubbles freely anywhere on screen.'
    },
    {
      src: 'assets/shots/7-arrival.jpg',
      tier: '1 free · All desktops in Pro',
      title: 'Your note is waiting when you arrive',
      desc: 'Colour-tinted Arrival Card greets you with the desktop’s name, marks, note and how long ago you jotted it.'
    },
    {
      src: 'assets/shots/8-editor.jpg',
      tier: '3 names free · Unlimited in Pro',
      title: 'An emoji, a name and a colour',
      desc: 'Click the active tag to edit: 9 calibrated colours and 8 marks stay free on every desktop.'
    },
    {
      src: 'assets/shots/9-folders.jpg',
      tier: 'Desktag Pro · Spotlight & Pill free',
      title: 'Unnamed desktops name themselves',
      desc: 'Follows terminal, editor and Finder folders plus page titles automatically, alongside Shortcuts, Focus Filters, links and AppleScript.'
    },
    {
      src: 'assets/shots/10-private.jpg',
      tier: 'Free · Focus Filters in Pro',
      title: 'No account. No tracking. No network access.',
      desc: 'Single App Sandbox entitlement with zero network permission. Private Mode hides titles, folders and notes on shared or mirrored screens.'
    }
  ];

  const gallery = document.querySelector('[data-gallery]');
  let galleryIndex = 0;

  const setGalleryIndex = (idx) => {
    galleryIndex = (idx + SHOTS.length) % SHOTS.length;
    if (!gallery) return;
    const item = SHOTS[galleryIndex];
    const img = gallery.querySelector('[data-gallery-img]');
    const badge = gallery.querySelector('[data-gallery-tier]');
    const title = gallery.querySelector('[data-gallery-title]');
    const desc = gallery.querySelector('[data-gallery-desc]');
    const count = gallery.querySelector('[data-gallery-count]');

    if (img) {
      img.src = item.src;
      img.alt = `${item.title} — ${item.desc}`;
    }
    if (badge) badge.textContent = item.tier;
    if (title) title.textContent = item.title;
    if (desc) desc.textContent = item.desc;
    if (count) count.textContent = `${galleryIndex + 1} / ${SHOTS.length}`;

    gallery.querySelectorAll('[data-thumb-idx]').forEach((btn) => {
      btn.setAttribute('aria-current', String(Number(btn.getAttribute('data-thumb-idx')) === galleryIndex));
    });
  };

  if (gallery) {
    gallery.querySelector('[data-gallery-prev]')?.addEventListener('click', () => setGalleryIndex(galleryIndex - 1));
    gallery.querySelector('[data-gallery-next]')?.addEventListener('click', () => setGalleryIndex(galleryIndex + 1));
    gallery.querySelectorAll('[data-thumb-idx]').forEach((btn) => {
      btn.addEventListener('click', () => setGalleryIndex(Number(btn.getAttribute('data-thumb-idx'))));
    });
    gallery.querySelector('[data-gallery-zoom]')?.addEventListener('click', () => openLightbox(galleryIndex));
  }

  // Lightbox shared across feature shots and gallery
  const lightbox = document.querySelector('[data-lightbox]');
  let lightboxIdx = 0;

  const renderLightbox = () => {
    if (!lightbox) return;
    const item = SHOTS[lightboxIdx];
    const img = lightbox.querySelector('[data-lightbox-img]');
    const cap = lightbox.querySelector('[data-lightbox-caption]');
    if (img) {
      img.src = item.src;
      img.alt = item.title;
    }
    if (cap) {
      cap.textContent = `${lightboxIdx + 1} / ${SHOTS.length} · ${item.title} (${item.tier}) — ${item.desc}`;
    }
  };

  const openLightbox = (idx) => {
    if (!lightbox) return;
    lightboxIdx = (idx + SHOTS.length) % SHOTS.length;
    renderLightbox();
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.querySelector('[data-lightbox-close]')?.focus();
  };

  const closeLightbox = () => {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
  };

  document.querySelectorAll('[data-shot-index]').forEach((btn) => {
    btn.addEventListener('click', () => openLightbox(Number(btn.getAttribute('data-shot-index'))));
  });

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });
    lightbox.querySelector('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
    lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => {
      lightboxIdx = (lightboxIdx - 1 + SHOTS.length) % SHOTS.length;
      renderLightbox();
    });
    lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => {
      lightboxIdx = (lightboxIdx + 1) % SHOTS.length;
      renderLightbox();
    });
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        lightboxIdx = (lightboxIdx - 1 + SHOTS.length) % SHOTS.length;
        renderLightbox();
      }
      if (e.key === 'ArrowRight') {
        lightboxIdx = (lightboxIdx + 1) % SHOTS.length;
        renderLightbox();
      }
    });
  }

  /* ------------------------------------------------------------------
     6. Interactive Switch Transition Studio (8 Pro transitions)
     ------------------------------------------------------------------ */
  const txStudio = document.querySelector('[data-transition-studio]');
  if (txStudio) {
    const DESCRIPTIONS = {
      fade: 'Dissolve — cross-dissolves the desktop you leave directly into the new one.',
      blur: 'Focus — softly defocuses the old desktop as the new one sharpens into focus.',
      slide: 'Push — pushes directly from the old desktop to the new one, skipping any spaces between.',
      glide: 'Glide — glides the new desktop in over the old one as the old one steps gently back.',
      wipe: 'Wipe — sweeps a soft feathered edge across to reveal the new desktop in place.',
      depth: 'Depth — steps cleanly forward or back in depth with no horizontal motion.',
      zoom: 'Zoom — expands the new desktop directly out of its tag in the sticker while the old one recedes.',
      iris: 'Iris — opens a circular aperture from the destination’s tag onto the new desktop.'
    };
    const PACE_MS = { snappy: 200, regular: 340, relaxed: 520 };

    let activeTx = 'fade';
    let pace = 'regular';
    let showingB = false;

    const paneA = txStudio.querySelector('[data-tx-pane="a"]');
    const paneB = txStudio.querySelector('[data-tx-pane="b"]');
    const descEl = txStudio.querySelector('[data-tx-desc]');
    const txButtons = txStudio.querySelectorAll('[data-tx-kind]');
    const paceButtons = txStudio.querySelectorAll('[data-tx-pace]');

    const resetPaneStyles = (el) => {
      el.style.transition = 'none';
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.style.filter = 'none';
      el.style.clipPath = 'none';
    };

    const runTransition = (kind) => {
      const dur = PACE_MS[pace] || 340;
      const incoming = showingB ? paneA : paneB;
      const outgoing = showingB ? paneB : paneA;
      showingB = !showingB;

      resetPaneStyles(incoming);
      resetPaneStyles(outgoing);
      outgoing.style.zIndex = '1';
      incoming.style.zIndex = '2';

      if (kind === 'fade') {
        incoming.style.opacity = '0';
      } else if (kind === 'blur') {
        incoming.style.opacity = '0';
        incoming.style.filter = 'blur(14px)';
      } else if (kind === 'slide') {
        incoming.style.transform = 'translateX(100%)';
      } else if (kind === 'glide') {
        incoming.style.transform = 'translateX(32%)';
        incoming.style.opacity = '0';
      } else if (kind === 'wipe') {
        incoming.style.clipPath = 'inset(0 0 0 100%)';
      } else if (kind === 'depth') {
        incoming.style.transform = 'scale(0.92)';
        incoming.style.opacity = '0';
      } else if (kind === 'zoom') {
        incoming.style.transformOrigin = '50% 10%';
        incoming.style.transform = 'scale(0.68)';
        incoming.style.opacity = '0';
      } else if (kind === 'iris') {
        incoming.style.clipPath = 'circle(0% at 50% 14%)';
      }

      // Force layout before animating
      void incoming.offsetWidth;
      const ease = 'cubic-bezier(0.16, 1, 0.3, 1)';
      incoming.style.transition = `transform ${dur}ms ${ease}, opacity ${dur}ms ease, filter ${dur}ms ease, clip-path ${dur}ms ${ease}`;
      outgoing.style.transition = `transform ${dur}ms ${ease}, opacity ${dur}ms ease, filter ${dur}ms ease`;

      incoming.style.opacity = '1';
      incoming.style.transform = 'none';
      incoming.style.filter = 'none';
      incoming.style.clipPath = kind === 'iris' ? 'circle(150% at 50% 14%)' : 'inset(0 0 0 0)';

      if (kind === 'blur') {
        outgoing.style.filter = 'blur(12px)';
      } else if (kind === 'slide') {
        outgoing.style.transform = 'translateX(-100%)';
      } else if (kind === 'glide' || kind === 'depth' || kind === 'zoom') {
        outgoing.style.transform = 'scale(0.94)';
        outgoing.style.opacity = '0.35';
      }
    };

    txButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        activeTx = btn.getAttribute('data-tx-kind');
        txButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        if (descEl) descEl.textContent = DESCRIPTIONS[activeTx] || '';
        runTransition(activeTx);
      });
    });

    paceButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        pace = btn.getAttribute('data-tx-pace');
        paceButtons.forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
        runTransition(activeTx);
      });
    });

    txStudio.querySelector('[data-tx-replay]')?.addEventListener('click', () => runTransition(activeTx));
  }

  /* ------------------------------------------------------------------
     7. Support Page Instant Question Filter
     ------------------------------------------------------------------ */
  const filterInput = document.querySelector('[data-support-filter]');
  if (filterInput) {
    const sections = Array.from(document.querySelectorAll('[data-support-item]'));
    const statusEl = document.querySelector('[data-support-status]');

    filterInput.addEventListener('input', () => {
      const q = filterInput.value.trim().toLowerCase();
      let shown = 0;
      sections.forEach((sec) => {
        const match = !q || sec.textContent.toLowerCase().includes(q);
        sec.hidden = !match;
        if (match) shown += 1;
      });
      if (statusEl) {
        statusEl.textContent = q
          ? `Showing ${shown} of ${sections.length} topics matching “${filterInput.value.trim()}”.`
          : `Showing all ${sections.length} topics.`;
      }
    });
  }
})();
