'use strict';

import { copyrightyear } from './footer.js';
import {
  fetchProducts,
  fetchCategories,
  fetchCategoryProducts,
} from './products.js';
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

//TODO: fetch categories list
async function categoriesListFetch() {
  const formFilter = document.querySelector('#select-categories');
  const categories = await fetchCategories();

  formFilter.innerHTML = "<option value=''>All</option>";

  categories.forEach(
    cat => (formFilter.innerHTML += `<option value=${cat}>${cat}</option>`)
  );
}
categoriesListFetch();

//TODO: initially show all the products
async function allProducts(category = null) {
  const resultsContainer = document.querySelector('.categories-results');
  const allProductsFromStorage =
    JSON.parse(localStorage.getItem('allProducts')) || null;
  const products = category
    ? await fetchCategoryProducts(category)
    : allProductsFromStorage
    ? allProductsFromStorage
    : await fetchProducts();
  const results = allProductsFromStorage
    ? allProductsFromStorage
    : products.products;

  if (category || category === '') {
    return products;
  } else {
    results.forEach(
      product =>
        (resultsContainer.innerHTML += `
      <div class='categories-product'>
        <div class='product-image'>
          <img src="${product.thumbnail}", alt="${product.title}"/>
        </div>

        <div class='product-info'>
          <h3 class='product-info-name'>${product.title}</h3>
          <h5 class='product-info-brand'>${product.brand}</h5>
          <span class='product-info-cat'>${product.category}</span>
        </div>
      </div>
      `)
    );
  }
}
allProducts();

//TODO: filter button to fetch filtered products
async function fetchFilteredProducts() {
  // Defining DOM Nodes
  const resultsContainer = document.querySelector('.categories-results');
  const filterBtn = document.querySelector('.cat-btn');
  const selectedCat = document.getElementById('select-categories');
  const ranges = Array.from(
    document.querySelectorAll('#ranges > div > div > input')
  );

  const allProductsFromStorage =
    JSON.parse(localStorage.getItem('allProducts')) || null;

  // Adding Click Event to the button
  filterBtn.addEventListener('click', async e => {
    e.preventDefault();
    // clearing the result container at the first
    resultsContainer.innerHTML = '';

    // extracting the user choices
    const selectedCategory = selectedCat.value;
    const fliteredPrices = ranges
      .filter(range => range.checked)
      .map(range => +range.value);

    // Filtering the products
    const productsOfCat =
      selectedCategory || !allProductsFromStorage
        ? await allProducts(selectedCategory)
        : allProductsFromStorage;
    const results = productsOfCat.products || allProductsFromStorage;

    const filteredProducts = fliteredPrices.length
      ? results.filter(product => {
          for (let x = 0; x < fliteredPrices.length; x++) {
            if (+product.price >= fliteredPrices[x]) return true;
          }

          return false;
        })
      : results;

    // showing the results based on the user choices, otherwise show the default results
    try {
      filteredProducts.forEach(
        product =>
          (resultsContainer.innerHTML += `
      <div class='categories-product'>
        <div class='product-image'>
          <img src="${product.thumbnail}", alt="${product.title}"/>
        </div>

        <div class='product-info'>
          <h3 class='product-info-name'>${product.title}</h3>
          <h5 class='product-info-brand'>${product.brand}</h5>
          <span class='product-info-cat'>${product.category}</span>
        </div>
      </div>
      `)
      );
    } catch (error) {
      console.log(error);
    }
  });
}
fetchFilteredProducts();

//TODO: Product page work
function findProductFromStorage(title) {
  const productsStorage = JSON.parse(localStorage.getItem('allProducts'));
  productsStorage.forEach(product => {
    if (product.title === title) {
      localStorage.setItem('product', JSON.stringify(product));
      location.href = './product.html';
    }
  });
}

function moveToProductPage() {
  const resultsContainer = document.querySelector('.categories-results');

  resultsContainer.addEventListener('click', e => {
    console.log(e.target);
    const targetImg = e.target.parentElement;

    if (targetImg.classList.contains('product-image')) {
      const productName =
        targetImg.nextElementSibling.firstElementChild.textContent;
      findProductFromStorage(productName);
    }
  });
}
moveToProductPage();
