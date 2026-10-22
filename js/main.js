const track = document.querySelector('.track');
const sections = document.querySelectorAll('.track section');

// Lets the CSS hide content only when JS is working
document.documentElement.classList.add('js');

// Vertical wheel -> horizontal scroll
track.addEventListener('wheel', (e) => {
  // only hijack mostly-vertical scrolling
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }
}, { passive: false });

// Animate each section in when it scrolls into view
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    entry.target.classList.toggle('visible', entry.isIntersecting);
  });
}, {
  root: track,     // the horizontal scroller, not the window
  threshold: 0.5   // section counts as "in view" at 50% visible
});

sections.forEach((section) => observer.observe(section));