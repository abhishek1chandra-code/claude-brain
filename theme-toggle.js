/**
 * theme-toggle.js — DCR-CMIS Light/Dark Theme Toggle
 * Sets data-theme="dark"|"light" on <html> element.
 * Persists preference in localStorage under key 'dcr-theme'.
 * Include in _Layout.cshtml and all portal layouts, before </body>.
 */

(function () {
  'use strict';

  const STORAGE_KEY = 'dcr-theme';
  const DARK  = 'dark';
  const LIGHT = 'light';

  /* ── Moon SVG (dark mode icon) ── */
  const MOON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>`;

  /* ── Sun SVG (light mode icon) ── */
  const SUN_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5"/>
    <line x1="12" y1="1"  x2="12" y2="3"/>
    <line x1="12" y1="21" x2="12" y2="23"/>
    <line x1="4.22" y1="4.22"  x2="5.64" y2="5.64"/>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
    <line x1="1"  y1="12" x2="3"  y2="12"/>
    <line x1="21" y1="12" x2="23" y2="12"/>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
  </svg>`;

  /** Apply theme to <html> element */
  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Legacy: also toggle body class for backward compat with old CSS
    if (theme === LIGHT) {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    // Update all toggle buttons in DOM
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.innerHTML = theme === DARK ? MOON_SVG : SUN_SVG;
      btn.setAttribute('aria-label', theme === DARK ? 'Switch to light mode' : 'Switch to dark mode');
      btn.setAttribute('title',      theme === DARK ? 'Light mode' : 'Dark mode');
    });
    // Emit custom event (Blazor components can subscribe)
    window.dispatchEvent(new CustomEvent('dcr-theme-change', { detail: { theme: theme } }));
  }

  /** Toggle between light and dark */
  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || DARK;
    const next    = current === DARK ? LIGHT : DARK;
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  }

  /** Get saved or preferred theme */
  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === LIGHT || saved === DARK) return saved;
    // Respect OS preference if no saved preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) return LIGHT;
    return DARK; // default
  }

  /** Wire up any buttons with data-theme-toggle attribute */
  function wireButtons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      // Prevent double-binding
      if (btn._themeWired) return;
      btn._themeWired = true;
      btn.addEventListener('click', toggleTheme);
      btn.style.cursor = 'pointer';
    });
  }

  /* ── Boot ── */
  // Apply saved theme immediately (before paint to avoid flash)
  applyTheme(getInitialTheme());

  // Wire buttons on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function () {
    wireButtons();
  });

  // Blazor re-renders can add new toggle buttons — re-wire after each render
  if (typeof window !== 'undefined') {
    window.addEventListener('blazor-enhanced-nav', function () {
      setTimeout(wireButtons, 50);
    });
    // For standard SPA navigation (SPA-shell fetch() swaps)
    window.dcrRewireTheme = wireButtons;
  }

  // Expose as global API
  window.dcrTheme = {
    toggle: toggleTheme,
    set: function (theme) {
      localStorage.setItem(STORAGE_KEY, theme);
      applyTheme(theme);
    },
    get: function () {
      return document.documentElement.getAttribute('data-theme') || DARK;
    }
  };

  // Sync across browser tabs
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY && e.newValue) {
      applyTheme(e.newValue);
    }
  });

}());
