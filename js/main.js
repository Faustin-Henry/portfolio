const m = document.getElementById('m');
const S = [...m.querySelectorAll('section')];
const L = [...document.querySelectorAll('nav a')];

const wide = () => innerWidth > 760;

// Navigate to section i (horizontal scroll on desktop, vertical on mobile)
const go = i => {
  i = Math.max(0, Math.min(S.length - 1, i));
  wide()
    ? m.scrollTo({ left: i * m.clientWidth })
    : S[i].scrollIntoView({ behavior: 'smooth' });
};

// Nav links and buttons
document.querySelectorAll('[data-i]').forEach(a =>
  a.addEventListener('click', () => go(+a.dataset.i))
);

const cur = () => Math.round(m.scrollLeft / m.clientWidth);

// Mouse wheel -> horizontal section changes
let lock = false;
m.addEventListener('wheel', e => {
  if (!wide()) return;
  if (e.target.closest('section') && Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
  e.preventDefault();
  if (lock || Math.abs(e.deltaY) < 8) return;
  lock = true;
  go(cur() + (e.deltaY > 0 ? 1 : -1));
  setTimeout(() => lock = false, 700);
}, { passive: false });

// Arrow keys
addEventListener('keydown', e => {
  if (!wide()) return;
  if (e.key === 'ArrowRight') go(cur() + 1);
  if (e.key === 'ArrowLeft') go(cur() - 1);
});

// Reveal animation + active nav highlight
const io = new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) {
    e.target.classList.add('in');
    const i = S.indexOf(e.target);
    L.forEach((a, k) => a.classList.toggle('on', k === i));
  }
}), { threshold: .5 });

S.forEach(s => io.observe(s));