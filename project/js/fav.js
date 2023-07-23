import { copyrightyear } from './footer.js';
import {
  logOutProfile,
  openProfileMenu,
  userHomePage,
  profileOfUser,
  removeActive,
  activeNavLinks,
  expandMenu,
  logOut,
  toLogIn,
  logInOut,
} from './header.js';

headerFooter();
function headerFooter() {
  userHomePage();
  profileOfUser();
  activeNavLinks();
  copyrightyear();
  expandMenu();
  logInOut();
}

showFav();
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

    removeFavItem();
  });
}

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
