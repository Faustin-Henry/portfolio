const track = document.querySelector('.track');
const sections = document.querySelectorAll('.track section');

// Lets the CSS hide content only when JS is working
document.documentElement.classList.add('js');

// ---- Wheel: one gesture = one section ----
const MIN_LOCK = 600;   // ms: at least this long after a jump (lets the glide finish)
const IDLE_TIME = 200;  // ms: wheel must be quiet this long before unlocking

let locked = false;
let lockedAt = 0;
let idleTimer;

function scheduleUnlock() {
  clearTimeout(idleTimer);
  const remainingMinLock = MIN_LOCK - (Date.now() - lockedAt);
  idleTimer = setTimeout(() => { locked = false; }, Math.max(IDLE_TIME, remainingMinLock));
}

track.addEventListener('wheel', (e) => {
  // only handle mostly-vertical wheel movement
  if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return;
  e.preventDefault();

  // Still locked: this is momentum from the same gesture.
  // Every extra event pushes the unlock time back.
  if (locked) {
    scheduleUnlock();
    return;
  }

  const direction = e.deltaY > 0 ? 1 : -1;
  const current = Math.round(track.scrollLeft / track.clientWidth);
  const next = Math.max(0, Math.min(sections.length - 1, current + direction));

  locked = true;
  lockedAt = Date.now();
  track.scrollTo({ left: next * track.clientWidth, behavior: 'smooth' });
  scheduleUnlock();
}, { passive: false });

// ---- Animate each section in when it scrolls into view ----
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  root: track,
  threshold: 0.5
});

sections.forEach((section) => observer.observe(section));