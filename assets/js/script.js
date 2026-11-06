/* Panduan Pengunjung — interaksi kecil (halaman tetap berfungsi tanpa JavaScript) */
(function () {
  'use strict';

  // 1. Tombol menu di layar kecil
  var tombol = document.querySelector('.tombol-menu');
  var nav = document.getElementById('nav-utama');
  if (tombol && nav) {
    tombol.addEventListener('click', function () {
      var terbuka = nav.classList.toggle('terbuka');
      tombol.setAttribute('aria-expanded', terbuka ? 'true' : 'false');
      tombol.querySelector('.ms').textContent = terbuka ? 'close' : 'menu';
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('terbuka');
        tombol.setAttribute('aria-expanded', 'false');
        tombol.querySelector('.ms').textContent = 'menu';
      }
    });
  }

  // 2. Tandai topik yang sedang dibaca di daftar isi samping
  var tautan = document.querySelectorAll('.daftar-isi a');
  if (!('IntersectionObserver' in window) || !tautan.length) return;

  var peta = {};
  tautan.forEach(function (a) { peta[a.getAttribute('href').slice(1)] = a; });

  var pengamat = new IntersectionObserver(function (entri) {
    entri.forEach(function (e) {
      if (!e.isIntersecting) return;
      tautan.forEach(function (a) { a.classList.remove('aktif'); });
      var a = peta[e.target.id];
      if (a) a.classList.add('aktif');
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  document.querySelectorAll('.topik').forEach(function (s) { pengamat.observe(s); });
})();
