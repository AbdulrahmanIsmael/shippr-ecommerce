'use strict';

import { copyrightyear } from './footer.js';
import {
  userHomePage,
  profileOfUser,
  activeNavLinks,
  expandMenu,
  logInOut,
} from './header.js';

function headerFooter() {
  userHomePage();
  profileOfUser();
  activeNavLinks();
  copyrightyear();
  expandMenu();
  logInOut();
}
headerFooter();

function removeFavFromStorage(name) {
  const favs = JSON.parse(localStorage.getItem('favProducts'));
  const favFiltered = favs.filter(fav => fav.name !== name);

  localStorage.setItem('favProducts', JSON.stringify(favFiltered));
}

function showRemoveMsg() {
  const removeMsg = document.querySelector('.remove-msg');

  removeMsg.classList.add('remove-msg-show');
  setTimeout(() => {
    removeMsg.classList.remove('remove-msg-show');
  }, 2000);
}

function removeFavItem() {
  const removeBtn = document.querySelectorAll('.remove > .fa-trash');

  removeBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      removeFavFromStorage(
        e.target.parentElement.parentElement.parentElement.firstElementChild
          .textContent
      );
      e.target.parentElement.parentElement.parentElement.remove();
      showRemoveMsg();
    });
  });
}

function showFav() {
  const favList = document.querySelector('.fav-list');
  const favs = JSON.parse(localStorage.getItem('favProducts'));

  favs.forEach(fav => {
    favList.innerHTML += `
      <tr>
        <td class="product-title"><img src="${fav.img}" alt="">${fav.name}</td>
        <td>${fav.price}</td>
        <td>
          <input type="number" name="quantity" id="qty">
        </td>
        <td>
          <button class="add-btn"><i class="fa-solid fa-cart-shopping"></i> Add To Cart</button>
        </td>
        <td>
          <button class="remove"><i class="fa-solid fa-trash"></i></button>
        </td>
      </tr>
    `;

    addToCart();
    removeFavItem();
  });
}
showFav();

//TODO: Add product to the cart
function showCartMsg() {
  const cartMsg = document.querySelector('.cart-msg');

  cartMsg.classList.add('cart-msg-show');

  setTimeout(() => {
    cartMsg.classList.remove('cart-msg-show');
  }, 2000);
}

function injectToStorage(product) {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
  cartProducts.push(product);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

function addToCart() {
  const addBtn = document.querySelector('.add-btn');

  addBtn.addEventListener('click', e => {
    const target = e.target,
      name =
        target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.textContent,
      image =
        target.parentElement.previousElementSibling.previousElementSibling
          .previousElementSibling.firstElementChild.src,
      price =
        target.parentElement.previousElementSibling.previousElementSibling.textContent.slice(
          1
        ),
      qty =
        target.parentElement.previousElementSibling.firstElementChild.value ||
        1;

    const productInfo = {
      name,
      price,
      image,
      qty,
      total: +price * +qty,
    };
    showCartMsg();
    injectToStorage(productInfo);
  });
}
