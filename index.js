import { productDataWomens } from "./data.js";
let ourProductData = productDataWomens;
//innercontainer and items
let innerCarousel = document.querySelector(".inner-container");
let carouselItems = document.querySelectorAll(".inner-container .slider-item");
//btn
let prevBtn = document.querySelector("#prev");
let nextBtn = document.querySelector("#next");
//position index of image (at start) but changes
let imgIndex = 0;
let maxItems;
let size = 250;
//inputs-search-min-max
let searchBar = document.querySelector("#search");
let minSearchPrice = document.querySelector("#min");
let maxSearchPrice = document.querySelector("#max");
let typeSearch = document.querySelector("#type-search");
//initial Search params
let searchVal = "";
let minVal = 0;
let maxVal = 500;
let typeVal = "/";
//modal close-open

let modalCloseBtn = document.querySelector(".modal-close");
let modalContainer = document.querySelector(".modal-container");
let modalImg = document.querySelector(".modal-img");
let modalTitle = document.querySelector(".modal-title");
let modalLink = document.querySelector(".modal-link-tag");

renderItems(searchVal, minVal, maxVal, typeVal, ourProductData);

//render Items function
function renderItems(searchValue, minPrice, maxPrice, productType, data) {
  let dataToBeUsed = data.filter((ourProduct) => {
    return (
      ourProduct.productUrl.toLowerCase().includes(productType) &&
      (ourProduct.productTitle.toLowerCase().includes(searchValue) ||
        ourProduct.productTitle.toUpperCase().includes(searchValue)) &&
      Number(ourProduct.price) >= minPrice &&
      Number(ourProduct.price) <= maxPrice
    );
  });
  maxItems = 0;
  dataToBeUsed.forEach((ourProduct, index) => {
    //create the elements
    let productContainer = document.createElement("div");
    productContainer.classList.add("slider-item");

    productContainer.setAttribute("data-url-link", ourProduct.productUrl);
    productContainer.setAttribute("data-img-url", String(ourProduct.imageSrc));
    productContainer.setAttribute("data-item-name", ourProduct.productTitle);

    let productImgContainer = document.createElement("div");
    productImgContainer.classList.add("img-container");
    let productImg = document.createElement("img");
    productImg.classList.add("item-image");
    productImg.setAttribute("alt", "product-image");
    let overlayContainer = document.createElement("div");
    overlayContainer.classList.add("overlay");
    let infoIcon = document.createElement("i");
    infoIcon.classList.add("fas", "fa-info", "more-info");
    let detailContainer = document.createElement("div");
    detailContainer.classList.add("detail-container");
    let itemTitle = document.createElement("p");
    itemTitle.classList.add("item-title");
    let itemPrice = document.createElement("p");
    itemPrice.classList.add("item-price");

    //appends
    overlayContainer.append(infoIcon);
    productImgContainer.append(productImg, overlayContainer);

    detailContainer.append(itemTitle, itemPrice);

    productContainer.append(productImgContainer, detailContainer);

    //add-content
    productImg.setAttribute("src", ourProduct.imageSrc);
    itemTitle.textContent = ourProduct.productTitle;
    itemPrice.textContent = ourProduct.price;

    productContainer.addEventListener("click", (e) => {
      let ourModalImg = ourProduct.imageSrc;
      let ourModalTitle = ourProduct.productTitle;
      let ourModaLink = ourProduct.productUrl;
      modalContainer.classList.remove("hide");
      modalImg.setAttribute("src", ourModalImg);
      modalTitle.textContent = ourModalTitle;
      modalLink.setAttribute("href", ourModaLink);
      console.log("hello");
    });

    //append to carousel
    innerCarousel.append(productContainer);
    maxItems++;
  });
}

nextBtn.addEventListener("click", () => {
  if (imgIndex >= maxItems - 1) return;
  innerCarousel.style.transition = "transform 0.8s ease";
  imgIndex++;
  innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
});

prevBtn.addEventListener("click", () => {
  if (imgIndex <= 0) return;
  innerCarousel.style.transition = "transform 0.8s ease";
  imgIndex--;
  innerCarousel.style.transform = `translateX(${+(-size * imgIndex)}px)`;
});

searchBar.addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    removeAllChildNodes(innerCarousel);
    renderItems("", minVal, maxVal, typeVal, ourProductData);
    searchVal = "";

    imgIndex = 0;
    return;
  }
  removeAllChildNodes(innerCarousel);
  renderItems(e.target.value, minVal, maxVal, "", ourProductData);

  searchVal = e.target.value;
  innerCarousel.style.transform = `translateX(${0}px)`;

  imgIndex = 0;
});

minSearchPrice.addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    removeAllChildNodes(innerCarousel);
    renderItems(searchVal, 0, maxVal, typeVal, ourProductData);
    minVal = 0;

    imgIndex = 0;
    return;
  }
  removeAllChildNodes(innerCarousel);
  renderItems(searchVal, Number(e.target.value), maxVal, "", ourProductData);

  minVal = Number(e.target.value);

  innerCarousel.style.transform = `translateX(${0}px)`;

  imgIndex = 0;
});

maxSearchPrice.addEventListener("input", (e) => {
  if (e.target.value.length === 0) {
    removeAllChildNodes(innerCarousel);
    renderItems(searchVal, minVal, 500, typeVal, ourProductData);
    maxVal = 500;

    imgIndex = 0;
    return;
  }
  removeAllChildNodes(innerCarousel);

  maxVal = Number(e.target.value);
  renderItems(searchVal, minVal, Number(e.target.value), "", ourProductData);

  innerCarousel.style.transform = `translateX(${0}px)`;

  imgIndex = 0;
});
typeSearch.addEventListener("input", (e) => {
  if (e.target.value.length === "/") {
    removeAllChildNodes(innerCarousel);
    renderItems(searchVal, minVal, maxVal, "", ourProductData);
    typeVal = "/";

    imgIndex = 0;
    return;
  }

  removeAllChildNodes(innerCarousel);
  renderItems(searchVal, minVal, maxVal, e.target.value, ourProductData);

  typeVal = e.target.value;
  innerCarousel.style.transform = `translateX(${0}px)`;

  imgIndex = 0;
});

modalCloseBtn.addEventListener("click", () => {
  modalContainer.classList.add("hide");
});

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
