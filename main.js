/* Ghanem Lamloumi — portfolio behaviour.
   Four things only: theme, language, mobile nav, CV menu.
   Theme and language are already applied by the inline <head> script before
   first paint; this file keeps the controls in sync and persists manual choices. */
(function () {
  'use strict';

  var root = document.documentElement;
  var THEME_KEY = 'theme';
  var LANG_KEY = 'lang';

  function read(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function write(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage blocked */ }
  }

  /* ---------------- Theme ---------------- */

  var themeToggle = document.querySelector('[data-theme-toggle]');

  function currentTheme() {
    return root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function syncThemeToggle() {
    if (!themeToggle) return;
    themeToggle.setAttribute('aria-pressed', String(currentTheme() === 'light'));
  }

  function setTheme(theme, persist) {
    root.setAttribute('data-theme', theme);
    if (persist) write(THEME_KEY, theme);
    syncThemeToggle();
  }

  syncThemeToggle();

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'light' ? 'dark' : 'light', true);
    });
  }

  /* Follow the OS while no manual choice has been saved. */
  if (window.matchMedia) {
    var media = window.matchMedia('(prefers-color-scheme: light)');
    var onSystemChange = function (event) {
      var saved = read(THEME_KEY);
      if (saved !== 'light' && saved !== 'dark') {
        setTheme(event.matches ? 'light' : 'dark', false);
      }
    };
    if (media.addEventListener) media.addEventListener('change', onSystemChange);
    else if (media.addListener) media.addListener(onSystemChange);
  }

  /* ---------------- Language ---------------- */

  var langToggle = document.querySelector('[data-lang-toggle]');
  var titleEl = document.querySelector('title');
  var descEl = document.querySelector('meta[name="description"]');

  /* Swedish copy is the document default; the English variants ride along in
     data-en attributes so the <head> can switch without a second page. */
  var altText = {
    sv: {
      title: titleEl ? titleEl.textContent : '',
      description: descEl ? descEl.getAttribute('content') : '',
      toggleLabel: 'Byt till engelska'
    },
    en: {
      title: titleEl ? titleEl.getAttribute('data-en') : '',
      description: descEl ? descEl.getAttribute('data-en') : '',
      toggleLabel: 'Switch to Swedish'
    }
  };

  /* Attributes can't hold two languages the way markup can, so image alt text
     and aria-labels carry their English variant in a data attribute. */
  var altAttrNodes = [];
  Array.prototype.forEach.call(document.querySelectorAll('[data-alt-en]'), function (node) {
    altAttrNodes.push({ node: node, attr: 'alt', sv: node.getAttribute('alt'), en: node.getAttribute('data-alt-en') });
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-aria-en]'), function (node) {
    altAttrNodes.push({ node: node, attr: 'aria-label', sv: node.getAttribute('aria-label'), en: node.getAttribute('data-aria-en') });
  });

  function currentLang() {
    return root.getAttribute('data-lang') === 'en' ? 'en' : 'sv';
  }

  function setLang(lang, persist) {
    var alt = altText[lang];
    root.setAttribute('data-lang', lang);
    root.setAttribute('lang', lang);
    if (titleEl && alt.title) document.title = alt.title;
    if (descEl && alt.description) descEl.setAttribute('content', alt.description);
    if (langToggle) langToggle.setAttribute('aria-label', alt.toggleLabel);
    altAttrNodes.forEach(function (item) {
      if (item[lang]) item.node.setAttribute(item.attr, item[lang]);
    });
    if (persist) write(LANG_KEY, lang);
  }

  setLang(currentLang(), false);

  if (langToggle) {
    langToggle.addEventListener('click', function () {
      setLang(currentLang() === 'en' ? 'sv' : 'en', true);
    });
  }

  /* ---------------- Disclosures (mobile nav + CV menu) ---------------- */

  function wireDisclosure(button, panel, options) {
    if (!button || !panel) return;
    var closeOnOutsideClick = options && options.closeOnOutsideClick;

    function open() {
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    }

    function close(refocus) {
      panel.hidden = true;
      button.setAttribute('aria-expanded', 'false');
      if (refocus) button.focus();
    }

    button.addEventListener('click', function () {
      if (panel.hidden) open(); else close(false);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !panel.hidden) close(true);
    });

    if (closeOnOutsideClick) {
      document.addEventListener('click', function (event) {
        if (panel.hidden) return;
        if (button.contains(event.target) || panel.contains(event.target)) return;
        close(false);
      });
      panel.addEventListener('focusout', function (event) {
        if (panel.hidden) return;
        var next = event.relatedTarget;
        if (next && (panel.contains(next) || button.contains(next))) return;
        close(false);
      });
    }

    return { open: open, close: close };
  }

  wireDisclosure(
    document.querySelector('[data-nav-toggle]'),
    document.querySelector('[data-nav-panel]')
  );

  wireDisclosure(
    document.querySelector('[data-menu-button]'),
    document.querySelector('[data-menu-panel]'),
    { closeOnOutsideClick: true }
  );
})();
