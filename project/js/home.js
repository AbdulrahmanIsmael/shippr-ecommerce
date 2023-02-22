import { fetchProducts } from './products.js';
import { copyrightyear } from './footer.js';
copyrightyear();

// Defining DOM Nodes
const scNavBtns = document.querySelectorAll('.sc-nav-btn');
const scs = document.querySelectorAll('.sc');
const mostLis = document.querySelectorAll('#most-nav > ul > li');
const productsContainer = document.getElementById('products-container');
const slideLeft = document.getElementById('slideLeft');
const slideRight = document.getElementById('slideRight');
const reviewBtns = document.querySelectorAll('#review-row');
const shopBtns = document.querySelectorAll('.sc-btn');
const adsBtns = document.querySelectorAll('.ads-btn');
const cartBtns = document.querySelectorAll('.cart-btn');
const tableLinks = document.querySelectorAll('#footer > .resources > table a');
const articlesLinks = document.querySelectorAll('#news > .newsArticles a');
// const userNameHomePage = document.querySelector(
//   '.nav-icons > li:first-of-type > a > div'
// );
// const scUserH2 = document.querySelector('#sc1 .sc-content .text h2');
// const scUserP = document.querySelector('#sc1 .sc-content .text p');
// const profileMenu = document.querySelector('.profile-menu');
// const profileLink = document.querySelector('.profile-link');

function showcaseRelated() {
  scs.forEach((sc) => {
    scNavBtns.forEach((btn) => {
      if (btn.classList.contains('active')) {
        if (btn.innerText === sc.dataset.sc) {
          scs.forEach((s) => {
            s.classList.remove('show');
          });

          sc.classList.add('show');
        }
      }
    });
  });
}

//TODO: function to Add Event to the nav buttons & navigate through the showcases
const navShowcases = () => {
  scNavBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (!e.target.classList.contains('active')) {
        scNavBtns.forEach((b) => {
          b.classList.remove('active');
        });

        btn.classList.add('active');
      }
      showcaseRelated();
    });
  });
};

navShowcases();
4;

function checkActiveShowcase() {
  scNavBtns.forEach((btn) => {
    btn.classList.remove('active');
  });
}

//TODO: function to make the showcases automatically switch
scsAutowitch();
const switchInterval = setInterval(() => {
  scsAutowitch();
}, 15000);

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

//TODO: Setting up rating system for products
function starOne(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 1) {
    return ' gold';
  } else {
    return '';
  }
}

function starTwo(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 2) {
    return ' gold';
  } else {
    return '';
  }
}

function starThree(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 3) {
    return ' gold';
  } else {
    return '';
  }
}

function starFour(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 4) {
    return ' gold';
  } else {
    return '';
  }
}

function starFive(star) {
  const rateStar = Math.floor(star);
  if (rateStar >= 5) {
    return ' gold';
  } else {
    return '';
  }
}

//TODO: Fetch new arrival products (if stock > 50 then this is new arrival product)
newArrivalFetch();

function newArrivalFetch() {
  const products = fetchProducts();
  productsContainer.innerHTML = '';
  products.then((products) => {
    products.products.forEach((product) => {
      if (product.stock <= 50) {
        productsContainer.innerHTML += `
              <div class="product">
                <div class="product-image">
                <img src="${product.images[0]}">
                <div class='offer'>${product.discountPercentage}%</div>
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
      }
    });
  });
}

//TODO: Fetch Most Rated products
function mostRatedFetch() {
  const products = fetchProducts();
  productsContainer.innerHTML = '';
  products.then((products) => {
    products.products.forEach((product) => {
      if (+product.rating >= 4) {
        productsContainer.innerHTML += `
              <div class="product">
                <div class="product-image">
                <img src="${product.images[0]}">
                <div class='offer'>${product.discountPercentage}%</div>
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
      }
    });
  });
}

//TODO: Fetch Best Offers products
function bestOffersFetch() {
  const products = fetchProducts();
  productsContainer.innerHTML = '';
  products.then((products) => {
    let allProducts = products.products;
    allProducts.reverse();
    allProducts.forEach((product) => {
      if (+product.discountPercentage >= 10) {
        productsContainer.innerHTML += `
              <div class="product">
                <div class="product-image">
                <img src="${product.images[0]}">
                <div class='offer'>${product.discountPercentage}%</div>
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
      }
    });
  });
}

//TODO : Set active class to list items (categories) of products section + show corresponding Products
mostLisSwitch();

function mostLisSwitch() {
  mostLis.forEach((li) => {
    li.addEventListener('click', (e) => {
      if (!li.classList.contains('active')) {
        mostLis.forEach((l) => {
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

//TODO: make the sliding effect
slideProducts();

function slideProducts() {
  let productsContainerWidth = productsContainer.getBoundingClientRect().width;

  slideLeft.addEventListener('click', () => {
    productsContainer.scrollLeft -= productsContainerWidth;
  });

  slideRight.addEventListener('click', () => {
    productsContainer.scrollLeft += productsContainerWidth;
  });
}

//TODO: expand review information
expandReview();

function expandReview() {
  reviewBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.target.classList.toggle('open');
      if (e.target.classList.contains('open')) {
        e.target.parentElement.nextElementSibling.classList.remove(
          'closeReview'
        );
      } else {
        e.target.parentElement.nextElementSibling.classList.add('closeReview');
      }
    });
  });
}

//TODO: Function to make the buttons move to the login page if the user did not sign in
userStatus();

function checkUserStatus(btns, hrefLink) {
  btns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (!localStorage.getItem('username')) {
        location.href = '../logIn.html';
      } else {
        location.href = hrefLink;
      }
    });
  });
}

function userStatus() {
  //! Remember to modify the links here later (hrefLink)
  checkUserStatus(shopBtns, '../cat.html');
  checkUserStatus(adsBtns, '../cat.html');
  checkUserStatus(cartBtns, '../home.html');
  checkUserStatus(tableLinks, '../home.html');
  checkUserStatus(articlesLinks, '../cat.html');
}

//TODO: Change the home page if the user is logged in
// userHomePage();

// function openProfileMenu() {
//   userNameHomePage.parentElement.parentElement.addEventListener(
//     'click',
//     (e) => {
//       e.preventDefault();
//       userNameHomePage.parentElement.removeAttribute('href');
//       profileMenu.classList.toggle('close');
//     }
//   );
// }

// function logOutProfile() {
//   const logOutBtn = document.querySelector('.logout-link');
//   const profileBtn = document.querySelector('.profile-link');
//   logOutBtn.addEventListener('click', () => {
//     localStorage.clear();
//     location.reload();
//   });
//   profileBtn.addEventListener('click', () => {
//     location.href = './profile.html'; //! Do not forget to create profile page
//   });
// }

// function userHomePage() {
//   const localStorageUsername = localStorage.getItem('username');
//   const localStorageEmail = localStorage.getItem('email');
//   const localStoragePassword = localStorage.getItem('password');

//   if (localStorageEmail && localStoragePassword && localStorageUsername) {
//     userNameHomePage.innerHTML = localStorageUsername;
//     scUserH2.innerHTML = `Welcome ${localStorageUsername}`;
//     scUserP.innerHTML = 'Start Buying Now!';
//     openProfileMenu();
//     logOutProfile();
//   }
// }

// //TODO: Profile of the user
// profileOfUser();

// function profileOfUser() {
//   profileLink.addEventListener('click', () => {
//     if (localStorage.getItem('username')) {
//       location.href = '../profile.html';
//     }
//   });
// }
