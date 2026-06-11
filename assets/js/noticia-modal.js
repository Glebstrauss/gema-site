// Modal de notícias — <dialog> nativo, deep links e copiar link.
// Compartilhado por /noticias.html e /en/news.html.
// Os textos vêm de data-* no elemento #noticia-modal (i18n).
(function () {
  var dlg = document.getElementById('noticia-modal');
  if (!dlg || typeof dlg.showModal !== 'function') return;

  var txt = {
    readMore: dlg.dataset.readMore || 'Ler reportagem completa →',
    copy:     dlg.dataset.copy     || 'Copiar link',
    copied:   dlg.dataset.copied   || 'Link copiado!',
    copyFail: dlg.dataset.copyFail || 'Não foi possível copiar'
  };

  var elData     = document.getElementById('modal-data');
  var elTitulo   = document.getElementById('modal-titulo');
  var elTexto    = document.getElementById('modal-texto');
  var elLinkWrap = document.getElementById('modal-link-wrap');
  var btnCopiar  = document.getElementById('modal-copiar');
  var lblCopiar  = document.getElementById('modal-copiar-label');
  var timerCopiar = null;

  function abrirModal(btn) {
    elData.textContent   = btn.dataset.data;
    elTitulo.textContent = btn.dataset.titulo;
    elTexto.textContent  = btn.dataset.texto;
    elLinkWrap.innerHTML = '';
    if (btn.dataset.link) {
      var a = document.createElement('a');
      a.href = btn.dataset.link; a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.className = 'noticia-modal-link';
      a.textContent = txt.readMore;
      elLinkWrap.appendChild(a);
    }
    history.replaceState(null, '', '#' + btn.dataset.slug);
    dlg.showModal();
    document.body.style.overflow = 'hidden';
  }

  document.querySelectorAll('.noticia-abre-modal').forEach(function (btn) {
    btn.addEventListener('click', function () { abrirModal(btn); });
  });

  document.getElementById('modal-fechar').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () {
    document.body.style.overflow = '';
    history.replaceState(null, '', window.location.pathname + window.location.search);
    btnCopiar.classList.remove('copiado');
    lblCopiar.textContent = txt.copy;
  });

  btnCopiar.addEventListener('click', function () {
    var url = window.location.origin + window.location.pathname + window.location.hash;
    function feito(ok) {
      lblCopiar.textContent = ok ? txt.copied : txt.copyFail;
      btnCopiar.classList.toggle('copiado', ok);
      clearTimeout(timerCopiar);
      timerCopiar = setTimeout(function () {
        lblCopiar.textContent = txt.copy;
        btnCopiar.classList.remove('copiado');
      }, 2200);
    }
    function copiarFallback() {
      var ta = document.createElement('textarea');
      ta.value = url; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.opacity = '0';
      dlg.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      ta.remove(); feito(ok);
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(function () { feito(true); }, copiarFallback);
    } else { copiarFallback(); }
  });

  if (window.location.hash.length > 1) {
    var slug = window.location.hash.slice(1);
    try { slug = decodeURIComponent(slug); } catch (e) {}
    var alvo = null;
    try { alvo = document.querySelector('.noticia-abre-modal[data-slug="' + CSS.escape(slug) + '"]'); } catch (e) {}
    if (alvo) abrirModal(alvo);
  }
})();
