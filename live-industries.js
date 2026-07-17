const slides = Array.from({ length: 13 }, (_, index) => {
  const page = String(index + 1).padStart(2, "0");
  return {
    src: `assets/live-industries/brand-kit/live-industries-brand-kit-${page}.jpg`,
    alt: `Live.Industries brand-kit page ${index + 1}`,
  };
});

const root = document.querySelector("[data-slideshow]");
const image = root?.querySelector("[data-slide-image]");
const label = root?.querySelector("[data-slide-label]");
const progress = root?.querySelector("[data-progress]");
const thumbnails = Array.from(root?.querySelectorAll("[data-slide]") ?? []);

let current = 0;

function setSlide(index) {
  current = (index + slides.length) % slides.length;
  const slide = slides[current];

  image.src = slide.src;
  image.alt = slide.alt;
  label.textContent = `Page ${String(current + 1).padStart(2, "0")} of ${slides.length}`;
  progress.style.width = `${((current + 1) / slides.length) * 100}%`;

  thumbnails.forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === current);
  });
}

root?.querySelector("[data-previous]")?.addEventListener("click", () => {
  setSlide(current - 1);
});

root?.querySelector("[data-next]")?.addEventListener("click", () => {
  setSlide(current + 1);
});

thumbnails.forEach((button) => {
  button.addEventListener("click", () => {
    setSlide(Number(button.dataset.slide));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    setSlide(current - 1);
  }

  if (event.key === "ArrowRight") {
    setSlide(current + 1);
  }
});

setSlide(0);
