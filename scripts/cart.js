import { items } from "./items.js";

const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
const $productsCont = document.querySelector("main section.cart .products");
const $cartTotal = document.querySelector("header div.cart span.total");
const $modalTotal = document.querySelector(".top span");
let totalPrice;

showProducts();
calcPrices();

export function newItem($button) {
  const { product } = $button.dataset;
  const emptyCart = cartItems.some((value) => value.name === product);
  if (!emptyCart) {
    const productObj = items.find((obj) => {
      if (obj.name === product) {
        delete obj.purchased;
        obj.quantity = 0;
        return obj;
      }
    });
    cartItems.push(productObj);
    createCardItem(productObj, $productsCont);
  }
  addItem(product);
  showProducts();
}

function addItem(product) {
  cartItems.find((value, i) => {
    if (value.name === product) {
      cartItems[i].quantity++;
      createCardItem(cartItems[i], $productsCont);
      calcPrices();
    }
  });
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

function createCardItem(productObj, content) {
  const $div = document.createElement("div");
  $div.classList.add("product");
  $div.innerHTML = `
  <div class="image"> 
  <img src="${productObj.image}" alt="${productObj.name}">
  </div>
  `;

  const $infos = document.createElement("div");
  $infos.classList.add("infos");
  $infos.innerHTML = `<h3 class="title">${productObj.name}</h3>`;
  const $actions = document.createElement("div");
  $div.classList.add("actions");
  const $removeItem = document.createElement("button");
  $removeItem.classList.add("remove-item");
  $removeItem.innerHTML = `<i class="fas fa-trash"></i>`;
  $removeItem.addEventListener("click", () => {
    console.log("remove item");
  });
  $actions.appendChild($removeItem);
  const $removeOne = document.createElement("button");
  $removeOne.classList.add("remove-one");
  $removeOne.innerHTML = `&#9472;`;
  $removeOne.addEventListener("click", () => {
    console.log("remove one");
  });
  $actions.appendChild($removeOne);
  const $input = document.createElement("input");
  $input.type = "number";
  $input.max = "100";
  $input.min = "1";
  $input.value = productObj.quantity;
  $input.addEventListener("change", () => {
    console.log("change");
  });
  $actions.appendChild($input);
  const $add = document.createElement("button");
  $add.classList.add("add");
  $add.innerHTML = `&#43;`;
  $add.addEventListener("click", () => {
    addItem(productObj.name);
    showProducts();
  });
  $actions.appendChild($add);
  $infos.appendChild($actions);
  const $span = document.createElement("span");
  const price = productObj.price * productObj.quantity;
  $span.innerText = `$${price.toFixed(2)}`;
  $infos.appendChild($span);
  $div.appendChild($infos);
  content.appendChild($div);
}

function showProducts() {
  const $productsCont = document.querySelector("main section.cart .products");
  $productsCont.innerHTML = "";
  cartItems.forEach((productObj) => {
    createCardItem(productObj, $productsCont);
  });
}

function calcPrices() {
  totalPrice = 0;
  cartItems.forEach((product) => {
    const { price, quantity } = product;
    totalPrice += price * quantity;
  });
  $cartTotal.innerText = `$ ${totalPrice.toLocaleString()}`;
  $modalTotal.innerText = `Total $${totalPrice.toLocaleString()}`;
}
