//innercontainer and items
let innerCarousel = document.querySelector(".inner-container");
let carouselItems = document.querySelectorAll(".inner-container .slider-item");
//btn
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
//position index of image (at start) but changes
let imgIndex = 1;
let size = carouselItems[0].clientWidth;

innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`; //starting position

nextBtn.addEventListener("click", () => {
  if (imgIndex >= carouselItems.length - 3) return; //stop and wait for transition to finish before starting another slide round
  innerCarousel.style.transition = "transform 0.8s ease";
  imgIndex++;
  innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
});

prevBtn.addEventListener("click", () => {
  if (imgIndex <= 0) return; //stop and wait for transition to finish before starting another slide round
  innerCarousel.style.transition = "transform 0.8s ease";
  imgIndex--;
  innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
});

//check if last or first item and start another round or of same carousel items
innerCarousel.addEventListener("transitionend", () => {
  if (carouselItems[imgIndex].id === "last-clone") {
    innerCarousel.style.transition = "none";
    imgIndex = carouselItems.length - 3;
    innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
  }
  if (carouselItems[imgIndex].id === "first-clone") {
    innerCarousel.style.transition = "none";
    imgIndex = carouselItems.length - imgIndex;
    innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
  }
});
