const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navegacao');
const mobile = window.matchMedia('(max-width: 980px)');
function setMenu(open) {
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('is-closed', mobile.matches && !open);
}
function syncMenu() {
  if (mobile.matches && navigation.contains(document.activeElement)) toggle.focus();
  setMenu(false);
}
toggle.hidden = false;
syncMenu();
mobile.addEventListener('change', syncMenu);
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
navigation.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (!link || !mobile.matches) return;
  if (link.hash && link.origin === location.origin) {
    const target = document.getElementById(link.hash.slice(1));
    if (target) {
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      target.addEventListener('blur', () => target.removeAttribute('tabindex'), { once: true });
    }
  } else toggle.focus();
  setMenu(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobile.matches && toggle.getAttribute('aria-expanded') === 'true') {
    setMenu(false);
    toggle.focus();
  }
});
