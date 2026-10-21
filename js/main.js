const track = document.querySelector('.track');

track.addEventListener('wheel', (e) => {
  // only hijack mostly-vertical scrolling
  if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
    e.preventDefault();
    track.scrollLeft += e.deltaY;
  }
}, { passive: false });