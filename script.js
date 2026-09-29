document.querySelectorAll('.carousel').forEach((carousel) => {
  const track = carousel.querySelector('.photo-track');
  const photos = [...track.querySelectorAll('.photo')];
  const previousButton = carousel.querySelector('.arrow-prev');
  const nextButton = carousel.querySelector('.arrow-next');
  let currentIndex = 0;

  const getVisibleCount = () => window.matchMedia('(max-width: 700px)').matches ? 1 : 3;

  const updateCarousel = () => {
    const visibleCount = getVisibleCount();
    const maxIndex = Math.max(0, photos.length - visibleCount);
    currentIndex = Math.min(currentIndex, maxIndex);
    track.style.gridTemplateColumns = `repeat(${photos.length}, minmax(0, 1fr))`;
    track.style.width = `${(photos.length / visibleCount) * 100}%`;
    track.style.transform = `translate3d(${-(currentIndex * (100 / photos.length))}%, 0, 0)`;
    previousButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === maxIndex;
  };

  previousButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
  });

  nextButton.addEventListener('click', () => {
    currentIndex = Math.min(photos.length - getVisibleCount(), currentIndex + 1);
    updateCarousel();
  });

  window.addEventListener('resize', updateCarousel);
  updateCarousel();
});
