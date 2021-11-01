import { next, prev, dots } from "./scripts/carousel.js";
import { InitItems } from "./scripts/init-items.js";
import { newItem } from "./scripts/cart.js";
// import { checkout } from "./scripts/finishPurchase.js";
import "./scripts/search.js";

if (!localStorage.getItem("cart"))
  localStorage.setItem("cart", JSON.stringify([]));

const $next = document.querySelector("main section.carousel div.buttons-slide .buttons button.next");
const $prev = document.querySelector("main section.carousel div.buttons-slide .buttons button.prev");
const $dots = document.querySelectorAll("main section.carousel div.buttons-slide div.dots div");
const $cartButton = document.querySelector("header .cart");
const $cart = document.querySelector("main section.cart");
const $closeCart = $cart.querySelector("div button.close-cart");
const $finishPurchase = document.querySelector(".cart .footer button");
const $addItem = document.querySelectorAll("div.product button.add-item");
const $filtred = document.querySelector("div.search-products .filtred");
const $filters = document.querySelector("div.search-products .filters");

$next.addEventListener("click", () => next($next));
$prev.addEventListener("click", () => prev($prev));

window.addEventListener("scroll", () => {
  const $header = document.querySelector("header");
  if (window.scrollY > 365) {
    $header.classList.add("active");
  } else $header.classList.remove("active");
});

$filtred.addEventListener("click", () => {
  $filters.classList.toggle('active');
  $filtred.querySelector('i').classList.toggle('down')
});

$finishPurchase.addEventListener("click", () => checkout());

$cartButton.addEventListener("click", () => $cart.classList.add("active"));

$closeCart.addEventListener("click", () => $cart.classList.remove("active"));

dots($dots);

InitItems();

$addItem.forEach(($button) =>
  $button.addEventListener("click", () => newItem($button))
);
