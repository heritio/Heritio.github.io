import productDataWomens from "./data";

const innerCarousel = document.querySelector(".inner-container");
const carouselArrows = document.querySelectorAll(".arrow");
const numberOfItems = document.querySelectorAll(
  ".inner-container .slider-item"
).length;
let itemIndex = 1;
let translateX = 0;

carouselArrows.forEach((arrow) => {
  arrow.addEventListener("click", (event) => {
    if (event.target.id === "prev") {
      if (itemIndex !== 1) {
        itemIndex--;
        translateX += 300;
      }
    } else {
      if (itemIndex !== numberOfItems) {
        itemIndex++;
        translateX += 300;
      }
    }
    innerCarousel.style.transform = `translateX(${translateX}px)`;
  });
});
