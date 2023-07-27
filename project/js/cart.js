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

// TODO: Check the storage for the cartProducts to display them
function showRemoveMsg() {
  const removeMsg = document.querySelector('.remove-msg');

  removeMsg.classList.add('remove-msg-show');
  setTimeout(() => {
    removeMsg.classList.remove('remove-msg-show');
  }, 2000);
}

function removeProductCartFromStorage(name) {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));
  const filteredCart = cartProducts.filter(product => product.name !== name);

  localStorage.setItem('cartProducts', JSON.stringify(filteredCart));
}

function deleteProductFromCart() {
  const deleteBtns = document.querySelectorAll('.remove');

  deleteBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      if (e.target.classList.contains('fa-trash')) {
        const productName =
          e.target.parentElement.parentElement.previousElementSibling
            .previousElementSibling.previousElementSibling
            .previousElementSibling.textContent;
        e.target.parentElement.parentElement.parentElement.remove();
        removeProductCartFromStorage(productName);
        showRemoveMsg();
      }
    });
  });
}

function displayCartProducts() {
  const cartTable = document.querySelector('.cart-list');
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts'));

  if (cartProducts) {
    cartProducts.forEach(product => {
      const cartProduct = `
          <tr>
            <td class="product-title"><img src="${product.image}" alt="">${product.name}</td>
            <td>$${product.price}</td>
            <td>
              <input type="number" name="quantity" id="qty" value="${product.qty}" disabled>
            </td>
            <td>$${product.total}</td>
            <td>
              <button class="remove"><i class="fa-solid fa-trash"></i></button>
            </td>
          </tr>
      `;

      cartTable.innerHTML += cartProduct;
    });

    deleteProductFromCart();
  }
}
displayCartProducts();
