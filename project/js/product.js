import { copyrightyear } from './footer.js';
import {
  logOutProfile,
  openProfileMenu,
  userHomePage,
  profileOfUser,
  removeActive,
  activeNavLinks,
  expandMenu,
} from './header.js';

headerFooter();
function headerFooter() {
  userHomePage();
  profileOfUser();
  activeNavLinks();
  copyrightyear();
  expandMenu();
}

//TODO: feed the page with the product information
function dynamicNavImages() {
  const productImages = JSON.parse(localStorage.getItem('product')).images;
  let output = ``;

  productImages.forEach((url, i) => {
    if (i === 0) {
      output += `<li class="targeted"> <img class="image-nav" id="product-image${
        i + 1
      }" src="${url}" alt="product image ${i + 1}"></li>`;
    } else {
      output += `<li> <img class="image-nav" id="product-image${
        i + 1
      }" src="${url}" alt="product image ${i + 1}"></li>`;
    }
  });
  return output;
}

function feedingThePage() {
  const product = document.getElementById('product');
  if (localStorage.getItem('product')) {
    const productObject = JSON.parse(localStorage.getItem('product'));

    product.innerHTML = `
      <section id="product-welcome">
        <h2>${productObject.title}</h2>
      </section>
      <section id="product-info">
        <div class="images">
          <div class="images-image"><img src="${
            productObject.images[0]
          }" alt="Product Image" id="product-image"></div>
          <div class="images-nav">
            <ul>
              ${dynamicNavImages()}
            </ul>
          </div>
        </div>
        <div class="product-details">
          <div class="product-title">
            <h2 class="title">${productObject.title}</h2>
            <p class="brand"><small>${productObject.brand}</small></p>
          </div>
          <div class="details">
            <p class="price"><span>${
              productObject.price
            }$</span> <span class="discount">${
      productObject.discountPercentage
    }% <i class="fa-solid fa-tag"></i></span></p>
            <p class="rate">Rate <span>${productObject.rating}</span></p>
            <p class="category">Category <span>${
              productObject.category
            }</span></p>
            <p class="desc">${productObject.description}</p>
          </div>
          <div class="line"></div>
          <div class="product-purchase">
            <button class="wishlist-btn"><i class="fa-solid fa-heart"></i> Add To Wish list</button>
            <div class="product-add-cart">
              <input type="number" name="amount" id="product-amount" value="1" min="1">
              <button class="add-cart"><i class="fa-solid fa-cart-plus"></i> Add To Cart</button>
            </div>
          </div>
        </div>
      </section>
    `;
    document.title = `Shippr | ${productObject.title}`;
    addToFav(productObject.images[0], productObject.title, productObject.price);
  } else {
    setTimeout(() => {
      location.href = './home.html';
    }, 3000);
    product.innerHTML = `
    <h1 class="product-error"> Seems there is something wrong with the page... </h1>
    `;
  }
}
feedingThePage();
//TODO: Function to navigate through the product images
changeImgs();

function TargetClass(items, target) {
  items.forEach(item => {
    item.classList.remove('targeted');
  });

  target.classList.add('targeted');
}

function changeImgs() {
  const product = document.getElementById('product');
  product.addEventListener('click', e => {
    if (e.target.classList.contains('image-nav')) {
      const productImage = document.getElementById('product-image');
      const productImagesItems = document.querySelectorAll('.images-nav ul li');
      if (e.target.src !== productImage.src) {
        productImage.src = e.target.src;
        TargetClass(productImagesItems, e.target.parentElement);
      }
    }
  });
}

//TODO: Add To Favorites
function addToFav(img, title, price) {
  const favBtn = document.querySelector('.wishlist-btn');
  const favs = JSON.parse(localStorage.getItem('favProducts')) || [];

  favBtn.addEventListener('click', () => {
    const findItem = favs.find(item => item.name === title);
    if (!findItem) {
      const newFavs = [...favs, { img, name: title, price: `$${price}` }];
      localStorage.setItem('favProducts', JSON.stringify(newFavs));
      // !!! Show message when adding the item and change the button if the item in the local storage
    }
  });
}
