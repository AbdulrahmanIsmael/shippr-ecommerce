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
