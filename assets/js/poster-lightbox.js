// Lightbox dos pôsteres — <dialog> nativo: Esc fecha e o foco volta sozinho.
// Compartilhado por /posteres.html e /en/posters.html.
(function () {
  var dlg = document.getElementById('poster-dialog');
  if (!dlg || typeof dlg.showModal !== 'function') return;
  var img = document.getElementById('poster-dialog-img');

  document.querySelectorAll('.poster-zoom').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var thumb = btn.querySelector('img');
      img.src = thumb.currentSrc || thumb.src;
      img.alt = thumb.alt;
      dlg.setAttribute('aria-label', thumb.alt);
      dlg.showModal();
    });
  });

  document.getElementById('poster-dialog-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', function () { img.removeAttribute('src'); });
})();
