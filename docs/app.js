'use strict';
(() => {
  const buttons = [...document.querySelectorAll('[data-route]')];
  const answers = [...document.querySelectorAll('[data-answer]')];
  const isChinese = document.documentElement.lang === 'zh-CN';
  const showAll = document.querySelector('#show-all');
  const updateProgress = answer => {
    const boxes = [...answer.querySelectorAll('input[type="checkbox"]')];
    const count = boxes.filter(box => box.checked).length;
    answer.querySelector('.progress').textContent = isChinese
      ? `已标记 ${count} / ${boxes.length} 项`
      : `${count} / ${boxes.length} checks marked`;
  };
  const choose = (route, focus = true) => {
    if (!answers.some(answer => answer.dataset.answer === route)) return;
    for (const button of buttons) button.setAttribute('aria-pressed', String(button.dataset.route === route));
    for (const answer of answers) answer.hidden = answer.dataset.answer !== route;
    const answer = answers.find(item => item.dataset.answer === route);
    if (focus) answer.querySelector('h3').focus();
  };
  for (const answer of answers) {
    answer.hidden = true;
    answer.addEventListener('change', () => updateProgress(answer));
    answer.querySelector('.reset').addEventListener('click', () => {
      for (const box of answer.querySelectorAll('input[type="checkbox"]')) box.checked = false;
      updateProgress(answer);
    });
  }
  for (const button of buttons) button.addEventListener('click', () => {
    choose(button.dataset.route);
    window.reportRadioUse?.();
  });
  for (const link of document.querySelectorAll('[data-next]')) link.addEventListener('click', () => choose(link.dataset.next));
  showAll.addEventListener('click', () => {
    for (const answer of answers) answer.hidden = false;
    for (const button of buttons) button.setAttribute('aria-pressed', 'false');
  });
  const syncHash = () => {
    const match = /^#answer-(system|game|server)$/.exec(location.hash);
    if (match) choose(match[1], false);
    else if (location.hash === '#all-checks') {
      for (const answer of answers) answer.hidden = false;
      for (const button of buttons) button.setAttribute('aria-pressed', 'false');
    }
  };
  window.addEventListener('hashchange', syncHash);
  syncHash();
  document.documentElement.classList.add('enhanced');
})();
