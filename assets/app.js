// assets/app.js
// Accessible toast implementation (extracted from inline script)

(function(){
  const toast = document.getElementById('toast');
  const btn = document.getElementById('infoButton');
  let hideTimer = null;

  function showToast(message, timeout = 4000){
    if(!toast || !btn) return;
    toast.textContent = message;
    toast.style.display = 'block';
    btn.setAttribute('aria-expanded', 'true');
    if(hideTimer) clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      toast.style.display = 'none';
      btn.setAttribute('aria-expanded', 'false');
    }, timeout);
  }

  if (btn) {
    btn.addEventListener('click', function(){
      showToast('Selamat datang di SISFO SMK BATIK 1 SURAKARTA.');
      // Move focus back to the button after showing for screen reader context
      btn.focus();
    });
  }

  // keyboard shortcut: press 'i' to open info (only when focus is not on an input)
  document.addEventListener('keydown', function(e){
    const active = document.activeElement;
    const isInput = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
    if(!isInput && (e.key === 'i' || e.key === 'I')){
      showToast('Selamat datang di SISFO SMK BATIK 1 SURAKARTA.');
    }
  });
})();
