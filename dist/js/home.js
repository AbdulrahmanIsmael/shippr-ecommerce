'use strict';

import { fetchProducts } from './products.js';
import { copyrightyear } from './footer.js';
import {
  userHomePage,
  profileOfUser,
  activeNavLinks,
  expandMenu,
  logInOut,
} from './header.js';
import { confirmUserDetails } from './contact.js';

function headerFooter() {
  userHomePage();
  profileOfUser();
  activeNavLinks();
  copyrightyear();
  expandMenu();
  logInOut();
}
headerFooter();
confirmUserDetails();

// Defining DOM Nodes
const scNavBtns = document.querySelectorAll('.sc-nav-btn');
const productsContainer = document.getElementById('products-container');

//TODO: Store all the products data in storage
async function allProductsInStorage() {
  const allProducts = await fetchProducts();
  localStorage.setItem('allProducts', JSON.stringify(allProducts.products));
}
allProductsInStorage();

//TODO: setting up the showcases switching system
function changingShowcase() {
  const localStorageUsername = localStorage.getItem('username');
  const scUserH2 = document.querySelector('#sc1 .sc-content .text h2');
  const scUserP = document.querySelector('#sc1 .sc-content .text p');
  const localStoragePassword = localStorage.getItem('password');

  if (localStoragePassword) {
    scUserH2.innerHTML = `Welcome ${localStorageUsername}`;
    scUserP.innerHTML = 'Start Buying Now!';
  }
}
changingShowcase();

//TODO: function to Add Event to the nav buttons & navigate through the showcases
function showcaseRelated() {
  const scs = document.querySelectorAll('.sc');

  scs.forEach(sc => {
    scNavBtns.forEach(btn => {
      if (btn.classList.contains('active')) {
        if (btn.innerText === sc.dataset.sc) {
          scs.forEach(s => {
            s.classList.remove('show');
          });

          sc.classList.add('show');
        }
      }
    });
  });
}

function navShowcases() {
  scNavBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      if (!e.target.classList.contains('active')) {
        scNavBtns.forEach(b => {
          b.classList.remove('active');
        });

        btn.classList.add('active');
      }
      showcaseRelated();
    });
  });
}
navShowcases();

//TODO: function to make the showcases automatically switch
const switchInterval = setInterval(() => {
  scsAutowitch();
}, 15000);

function checkActiveShowcase() {
  scNavBtns.forEach(btn => {
    btn.classList.remove('active');
  });
}

function scsAutowitch() {
  setTimeout(() => {
    if (scNavBtns[0].classList.contains('active')) {
      checkActiveShowcase();
      scNavBtns[1].classList.toggle('active');
      showcaseRelated();
    }
  }, 5000);
  setTimeout(() => {
    checkActiveShowcase();
    scNavBtns[2].classList.toggle('active');
    showcaseRelated();
  }, 10000);
  setTimeout(() => {
    checkActiveShowcase();
    scNavBtns[0].classList.toggle('active');
    showcaseRelated();
  }, 15000);
}
scsAutowitch();

//TODO: Setting up rating system for products
export function starOne(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 1) {
    return ' gold';
  } else {
    return '';
  }
}

export function starTwo(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 2) {
    return ' gold';
  } else {
    return '';
  }
}

export function starThree(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 3) {
    return ' gold';
  } else {
    return '';
  }
}

export function starFour(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 4) {
    return ' gold';
  } else {
    return '';
  }
}

export function starFive(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 5) {
    return ' gold';
  } else {
    return '';
  }
}

//TODO: Fetch new arrival products (if stock > 50 then this is new arrival product)
export function newArrivalFetch() {
  const products = fetchProducts();
  productsContainer.innerHTML = '';
  products.then(products => {
    if (!localStorage.getItem('products')) {
      localStorage.setItem('products', JSON.stringify(products.products));
    }
    products.products.forEach(product => {
      if (product.stock <= 50) {
        const productHTML = `
              <div class="product">
                <div class="product-image">
                <img src="${product.images[0]}">
                <div class='offer'>${
                  product.discountPercentage
                }% <i class="fa-solid fa-tag"></i></div>
                </div>
                <div class="product-info">
                  <h2>${product.title}</h2>
                  <p>${product.price}$</p>
                  <div class="rate"><i class="fa-solid fa-star${starOne(
                    +product.rating
                  )}"></i><i class="fa-solid fa-star${starTwo(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starThree(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starFour(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starFive(
          +product.rating
        )}"></i></div>
                  <button class="cart-btn">add to cart <i class="fa-solid fa-cart-plus"></i></button>
                </div>
              </div>
              `;
        productsContainer.innerHTML += productHTML;
        addToCart();
      }
    });
  });
}
newArrivalFetch();

//TODO: Fetch Most Rated products
function mostRatedFetch() {
  const products = fetchProducts();
  productsContainer.innerHTML = '';
  products.then(products => {
    products.products.forEach(product => {
      if (+product.rating >= 4) {
        productsContainer.innerHTML += `
              <div class="product">
                <div class="product-image">
                <img src="${product.images[0]}">
                <div class='offer'>${
                  product.discountPercentage
                }% <i class="fa-solid fa-tag"></i></div>
                </div>
                <div class="product-info">
                  <h2>${product.title}</h2>
                  <p>${product.price}$</p>
                  <div class="rate"><i class="fa-solid fa-star${starOne(
                    +product.rating
                  )}"></i><i class="fa-solid fa-star${starTwo(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starThree(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starFour(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starFive(
          +product.rating
        )}"></i></div>
                  <button class="cart-btn">add to cart <i class="fa-solid fa-cart-plus"></i></button>
                </div>
              </div>
              `;
        addToCart();
      }
    });
  });
}

//TODO: Fetch Best Offers products
function bestOffersFetch() {
  const products = fetchProducts();
  productsContainer.innerHTML = '';
  products.then(products => {
    let allProducts = products.products;
    allProducts.reverse();
    allProducts.forEach(product => {
      if (+product.discountPercentage >= 10) {
        productsContainer.innerHTML += `
              <div class="product">
                <div class="product-image">
                <img src="${product.images[0]}">
                <div class='offer'>${
                  product.discountPercentage
                }% <i class="fa-solid fa-tag"></i></div>
                </div>
                <div class="product-info">
                  <h2>${product.title}</h2>
                  <p>${product.price}$</p>
                  <div class="rate"><i class="fa-solid fa-star${starOne(
                    +product.rating
                  )}"></i><i class="fa-solid fa-star${starTwo(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starThree(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starFour(
          +product.rating
        )}"></i><i class="fa-solid fa-star${starFive(
          +product.rating
        )}"></i></div>
                  <button class="cart-btn">add to cart <i class="fa-solid fa-cart-plus"></i></button>
                </div>
              </div>
              `;
        addToCart();
      }
    });
  });
}

function injectToStorage(product) {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];
  cartProducts.push(product);
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
}

function showAddedToCartMsg() {
  const cartMsg = document.querySelector('.cart-msg');

  cartMsg.classList.add('cart-msg-show');

  setTimeout(() => {
    cartMsg.classList.remove('cart-msg-show');
  }, 2000);
}

function addToCart() {
  const addToCartBtn = document.querySelectorAll('.cart-btn');
  addToCartBtn.forEach(btn => {
    btn.addEventListener('click', e => {
      const element = e.target,
        price = parseInt(
          element.previousElementSibling.previousElementSibling.textContent
        ),
        name =
          element.previousElementSibling.previousElementSibling
            .previousElementSibling.textContent,
        image =
          element.parentElement.previousElementSibling.firstElementChild.src,
        qty = 1;
      const productInfo = {
        name,
        image,
        price,
        qty,
        total: price,
      };
      injectToStorage(productInfo);
      showAddedToCartMsg();
    });
  });
}

//TODO : Set active class to list items (categories) of products section + show corresponding Products
function mostLisSwitch() {
  const mostLis = document.querySelectorAll('#most-nav > ul > li');

  mostLis.forEach(li => {
    li.addEventListener('click', e => {
      if (!li.classList.contains('active')) {
        mostLis.forEach(l => {
          l.classList.remove('active');
        });
        li.classList.add('active');
      }

      //* Here add the invocation of the function that will make the get request to show the products related to the li
      if (e.target.innerText === 'New Arrival') {
        newArrivalFetch();
      } else if (e.target.innerText === 'Most Rated') {
        mostRatedFetch();
      } else if (e.target.innerText === 'Best Offers') {
        bestOffersFetch();
      }
    });
  });
}
mostLisSwitch();

//TODO: make the sliding effect
function slideProducts() {
  const slideLeft = document.getElementById('slideLeft');
  const slideRight = document.getElementById('slideRight');

  slideLeft.addEventListener('click', () => {
    productsContainer.scrollLeft -= 250;
  });

  slideRight.addEventListener('click', () => {
    productsContainer.scrollLeft += 250;
  });
}
slideProducts();

//TODO: expand review information
function expandReview() {
  const reviewBtns = document.querySelectorAll('.reviewer-personal-info');

  reviewBtns.forEach(btn => {
    btn.addEventListener('click', e => {
      const reviewRow = e.target.lastElementChild;
      const reviewInfo = e.target.nextElementSibling;
      reviewRow.classList.toggle('open');

      if (reviewInfo.style.maxHeight) {
        reviewInfo.style.maxHeight = null;
        setTimeout(() => {
          reviewInfo.style.borderBottom = '0';
        }, 400);
      } else {
        reviewInfo.style.border = '1px solid #888';
        reviewInfo.style.borderTop = '0';
        reviewInfo.style.maxHeight = `${reviewInfo.scrollHeight}px`;
      }
    });
  });
}
expandReview();

//TODO: Open Product Page
function findProductFromStorage(title) {
  const productsStorage = JSON.parse(localStorage.getItem('allProducts'));
  productsStorage.forEach(product => {
    if (product.title === title) {
      localStorage.setItem('product', JSON.stringify(product));
      location.href = './product.html';
    }
  });
}

function productPage() {
  productsContainer.addEventListener('click', e => {
    const product = e.target.parentElement;
    if (product.classList.contains('product-image')) {
      // check if the user is signed in or no
      if (!localStorage.getItem('username')) {
        location.href = './logIn.html';
      } else {
        const productTitle =
          product.nextElementSibling.firstElementChild.textContent;
        findProductFromStorage(productTitle);
      }
    }
  });
}
productPage();

//TODO: make the buttons move to the login page if the user did not sign in
function checkUserStatus(btns, hrefLink) {
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (!localStorage.getItem('username')) {
        location.href = './logIn.html';
      } else {
        location.href = hrefLink;
      }
    });
  });
}

function userStatus() {
  const shopBtns = document.querySelectorAll('.sc-btn');
  const adsBtns = document.querySelectorAll('.ads-btn');
  const cartBtns = document.querySelectorAll('.cart-btn');
  const articlesLinks = document.querySelectorAll('#news > .newsArticles a');

  checkUserStatus(shopBtns, './home.html');
  checkUserStatus(adsBtns, './home.html');
  checkUserStatus(cartBtns, './cart.html');
  checkUserStatus(articlesLinks, './home.html');
}
userStatus();
