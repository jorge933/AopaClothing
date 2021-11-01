import { items } from "./itemsAndCoupons.js";
import { newItem } from "./cart.js";

const $inputSearch = document.querySelector("div.search-products .input input");
const $sectionProducts = document.querySelectorAll("section.products div.container");
const $sectionSearch = document.querySelector("section.products div.search div.products-cont");
const $filters = document.querySelectorAll("div.search-products .filter div.filters div");

const processChange = debounce((e) =>
  e.target.value !== "" ? search(e) : backToProducts()
);
const filters = ["all", "shorts", "t-shirt", "pants"];

let filtred = "";
let lookingFor = "";

$inputSearch.addEventListener("input", processChange);

$filters.forEach(($button, i) => {
  $button.addEventListener("click", () => {
    if (filtred !== filters[i]) {
      filtred = filters[i];
      lookingFor.length > 0 ? search() : filter(filtred === "all" ? true : false);
    }
  });
});

function filter(all) {
  if (!all) {
    const products = [];

    items.filter((value) => {
      if (value.type === filtred) {
        products.push(value);
      }
    });

    const search = new RegExp(lookingFor, 'gi');
    
    $sectionProducts.forEach(($div) => $div.classList.remove("active"));
    $sectionSearch.parentElement.classList.add("active");

    $sectionSearch.innerHTML = "";
    products.forEach(value => {
      if (value.name.match(search)) createCardProduct(value)
    });
  } else items.forEach(createCardProduct);
}

function debounce(func, timeout = 800) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

function search(e) {
  const productSearching = RegExp(e.target.value.trim(), "gi");

  $sectionSearch.innerHTML = "";

  const products = [];

  items.find((value) => {
    if (value.name.match(productSearching)) {
      products.push(value);
    }
  });

  if (filtred.length > 0 && filtred !== 'all') {
    products.filter((value, i) => {
      if (value.type !== filtred) {
        products.splice(i, 1);
      }
    });
  }

  products.forEach(createCardProduct);

  $sectionProducts.forEach(($div) => $div.classList.remove("active"));
  $sectionSearch.parentElement.classList.add("active");
}

function createCardProduct(product) {
  const $divProduct = document.createElement("div");
  $divProduct.classList.add("product");
  $divProduct.innerHTML = `
        <h3 class="title">${product.name}</h3>
        <div class="short">
            <img src="${product.image}" alt="${product.name}">
            <span>$ ${product.price.toLocaleString()}</span>
        </div>`;

  const $button = document.createElement("button");
  $button.classList.add("add-item");
  $button.dataset.product = product.name;
  $button.innerText = "Add";

  $button.addEventListener("click", () => newItem($button));

  $divProduct.appendChild($button);

  $sectionSearch.appendChild($divProduct);
}

function backToProducts() {
  $sectionProducts.forEach(($div) => $div.classList.add("active"));
  $sectionSearch.parentElement.classList.remove("active");
}