window.addEventListener('load', function() {
    var mask = document.getElementById('mask');
    var load = document.getElementById('load');
    setTimeout(() => {
      mask.classList.add('loaded');
      load.style.display = 'none';
    }, 500);
  });
