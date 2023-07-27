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

//TODO: expand instructions
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
expandInstruction();
