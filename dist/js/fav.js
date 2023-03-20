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
  });
}
