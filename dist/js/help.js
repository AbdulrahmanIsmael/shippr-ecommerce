import { copyrightyear } from './footer.js';
import {
  logOutProfile,
  openProfileMenu,
  userHomePage,
  profileOfUser,
  removeActive,
  activeNavLinks,
} from './header.js';

headerFooter();
function headerFooter() {
  userHomePage();
  profileOfUser();
  activeNavLinks();
  copyrightyear();
}

//TODO: expand instructions
expandInstruction();

//! need to be modified to expand the instruction box even in the case of clicking on the text...
function expandInstruction() {
  const instructions = document.querySelectorAll('.instruction > div');

  instructions.forEach((ins) => {
    ins.addEventListener('click', (e) => {
      const row = e.target.firstElementChild;
      const textDetailed = e.target.nextElementSibling;
      row.classList.toggle('open');
      if (row.classList.contains('open')) {
        textDetailed.classList.remove('closeReview');
        e.target.style.borderBottom = '0';
      } else {
        textDetailed.classList.add('closeReview');
        e.target.style.borderBottom = '1px solid #888';
      }
    });
  });
}
