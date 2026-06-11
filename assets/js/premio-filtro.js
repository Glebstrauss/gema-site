// Busca/filtro da página de prêmios — compartilhado por /premios e /en/awards.
// Espelha o comportamento da página de publicações. Textos do contador via
// data-* em #premio-count (i18n).
(function () {
  var search   = document.getElementById('premio-search');
  var clearBtn = document.getElementById('premio-search-clear');
  var wrap     = search ? search.closest('.pub-search-wrap') : null;
  var resetBtn = document.getElementById('premio-reset');
  var noRes    = document.getElementById('premio-no-results');
  var yearNav  = document.getElementById('premio-year-nav');
  var countEl  = document.getElementById('premio-count');
  var printBtn = document.getElementById('premio-print-btn');
  if (!search) return;

  var cards    = Array.from(document.querySelectorAll('.premio-card'));
  var sections = Array.from(document.querySelectorAll('.premio-ano-grupo'));
  var total    = cards.length;
  var label    = (countEl && countEl.dataset.label) || 'prêmios';
  var ofWord   = (countEl && countEl.dataset.of)    || 'de';

  function updateWrap() { if (wrap) wrap.classList.toggle('has-value', !!search.value); }

  function updateCount(n) {
    if (!countEl) return;
    countEl.textContent = n === total ? (total + ' ' + label)
                                      : (n + ' ' + ofWord + ' ' + total + ' ' + label);
    countEl.classList.toggle('filtered', n !== total);
  }

  function applyFilter() {
    var q = search.value.toLowerCase().trim();
    var matched = 0;
    cards.forEach(function (card) {
      var ok = !q || (card.dataset.busca || '').indexOf(q) > -1;
      card.classList.toggle('pub-hidden', !ok);
      if (ok) matched++;
    });
    sections.forEach(function (s) {
      s.classList.toggle('pub-hidden', !s.querySelectorAll('.premio-card:not(.pub-hidden)').length);
    });
    var filtering = !!q;
    if (yearNav) yearNav.style.display = filtering ? 'none' : '';
    if (countEl) countEl.style.display = filtering ? '' : 'none';
    if (noRes)   noRes.classList.toggle('visible', matched === 0);
    updateCount(matched);
  }

  function reset() { search.value = ''; updateWrap(); applyFilter(); search.focus(); }

  search.addEventListener('input', function () { updateWrap(); applyFilter(); });
  if (resetBtn) resetBtn.addEventListener('click', reset);
  if (clearBtn) {
    clearBtn.addEventListener('mousedown', function (e) { e.preventDefault(); });
    clearBtn.addEventListener('click', reset);
  }
  document.addEventListener('keydown', function (e) {
    var tag = document.activeElement ? document.activeElement.tagName : '';
    if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA' && tag !== 'SELECT') {
      e.preventDefault(); search.focus(); search.select();
      search.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
  if (printBtn) printBtn.addEventListener('click', function () { window.print(); });

  if (countEl) countEl.style.display = 'none'; // só aparece ao filtrar
})();
