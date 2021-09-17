//innercontainer and items
let innerCarousel = document.querySelector(".inner-container");
let carouselItems = document.querySelectorAll(".inner-container .slider-item");
//btn
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
//position index of image (at start) but changes
let imgIndex = 1;
let size = carouselItems[0].clientWidth;

innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;

nextBtn.addEventListener("click", () => {
  innerCarousel.style.transition = "transform 0.4s ease";
  imgIndex++;
  innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
});

prevBtn.addEventListener("click", () => {
  innerCarousel.style.transition = "transform 0.4s ease";
  imgIndex--;
  innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
});

innerCarousel.addEventListener("transitionend", () => {
  console.log("Transition");
});
