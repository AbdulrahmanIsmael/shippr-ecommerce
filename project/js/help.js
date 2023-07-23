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

//TODO: expand instructions
expandInstruction();

function expandInstruction() {
  const instructions = document.querySelectorAll('.instruction');

  instructions.forEach(ins => {
    ins.addEventListener('click', e => {
      if (e.target.parentElement.classList.contains('instruction')) {
        if (e.target.parentElement.nextElementSibling.style.maxHeight) {
          e.target.parentElement.nextElementSibling.style.maxHeight = null;
          setTimeout(() => {
            e.target.parentElement.nextElementSibling.style.borderBottom = '0';
          }, 400);
        } else {
          e.target.parentElement.nextElementSibling.style.border =
            '1px solid #888';
          e.target.parentElement.nextElementSibling.style.borderTop = '0';
          e.target.parentElement.nextElementSibling.style.maxHeight = `${e.target.parentElement.nextElementSibling.scrollHeight}px`;
        }
        const row = e.target.firstElementChild;
        row.classList.toggle('open');
      }
    });
  });
}
