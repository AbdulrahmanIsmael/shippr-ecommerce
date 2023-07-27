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
