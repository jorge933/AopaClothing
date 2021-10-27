import { items } from "./items.js";

const $productsCont = document.querySelector('main section.products .casual div.products-cont');

export function InitItems() {
    items.forEach(item => {
        $productsCont.innerHTML += `<div class="product">
                <h3 class="title">${item.title}</h3>
                <div>
                    <img src="${item.image}" alt="${item.title}">
                    <span>${item.price.toLocaleString('USD', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <button data-product="t-shirt-red">Add</button>
            </div>`
    });

    const highlights = items.sort((obj1, obj2) => {
        return obj1.purchased < obj2.purchased ? -1 : true
    }).reverse();

    const $highlightsCont = $productsCont.parentElement.previousElementSibling.lastElementChild;


    for (let i = 0; i < 4; i++) {
        $highlightsCont.innerHTML += `
            <div class="product">
                <h3 class="title">${highlights[i].title}</h3>
                <div class="short">
                    <img src="${highlights[i].image}" alt="${highlights[i].title}">
                    <span>${highlights[i].price.toLocaleString('USD', { style: 'currency', currency: 'USD' })}</span>
                </div>
                <span class="purchased">Purhcaseds: ${highlights[i].purchased}</span>
                <button data-product="${highlights[i].title}">Add</button>
            </div>
        `
    }
}