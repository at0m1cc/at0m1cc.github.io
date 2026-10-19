(function () {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const themeIcon = document.querySelector('[data-theme-icon]');
  const copyButton = document.querySelector('[data-copy-email]');
  const copyStatus = document.querySelector('[data-copy-status]');
  const printButtons = document.querySelectorAll('[data-print]');
  const email = 'ivyahkuzin@yandex.ru';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☼';
      if (themeToggle) themeToggle.setAttribute('aria-label', 'Переключить на светлую тему');
    } else {
      root.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '◐';
      if (themeToggle) themeToggle.setAttribute('aria-label', 'Переключить на тёмную тему');
    }
  }

  try {
    const savedTheme = localStorage.getItem('resume-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') applyTheme(savedTheme);
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) applyTheme('dark');
  } catch (_error) {
    // If browser storage is unavailable, the site still works with the default light theme.
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(nextTheme);
      try { localStorage.setItem('resume-theme', nextTheme); } catch (_error) { /* Storage is optional. */ }
    });
  }

  if (copyButton) {
    copyButton.addEventListener('click', async function () {
      try {
        await navigator.clipboard.writeText(email);
        if (copyStatus) copyStatus.textContent = 'Адрес скопирован в буфер обмена.';
      } catch (_error) {
        if (copyStatus) copyStatus.textContent = 'Не удалось скопировать автоматически. Используйте адрес ivyahkuzin@yandex.ru выше.';
      }
    });
  }

  printButtons.forEach(function (button) {
    button.addEventListener('click', function () { window.print(); });
  });
})();
