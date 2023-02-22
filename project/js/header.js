const userNameHomePage = document.querySelector(
  '.nav-icons > li:first-of-type > a > div'
);
const scUserH2 = document.querySelector('#sc1 .sc-content .text h2');
const scUserP = document.querySelector('#sc1 .sc-content .text p');
const profileMenu = document.querySelector('.profile-menu');
const profileLink = document.querySelector('.profile-link');
const logOutBtn = document.querySelector('.logout-link');
const headerLinks = document.querySelectorAll('.nav-links > li > a');

//TODO: Change the home page if the user is logged in
userHomePage();

function openProfileMenu() {
  userNameHomePage.parentElement.parentElement.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      userNameHomePage.parentElement.removeAttribute('href');
      profileMenu.classList.toggle('close');
    }
  );
}

function logOutProfile() {
  logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
  profileLink.addEventListener('click', () => {
    location.href = './profile.html'; //! Do not forget to create profile page
  });
}

function userHomePage() {
  const localStorageUsername = localStorage.getItem('username');
  const localStorageEmail = localStorage.getItem('email');
  const localStoragePassword = localStorage.getItem('password');

  if (localStorageEmail && localStoragePassword && localStorageUsername) {
    userNameHomePage.innerHTML = localStorageUsername;
    scUserH2.innerHTML = `Welcome ${localStorageUsername}`;
    scUserP.innerHTML = 'Start Buying Now!';
    openProfileMenu();
    logOutProfile();
  }
}

//TODO: Profile of the user
profileOfUser();

function profileOfUser() {
  profileLink.addEventListener('click', () => {
    if (localStorage.getItem('username')) {
      location.href = '../profile.html';
    }
  });
}

//TODO: Setting active class to links
activeNavLinks();

function activeLink(link) {
  headerLinks.forEach((navLink) => {
    navLink.classList.remove('activeNav');
  });

  link.classList.add('activeNav');
}

function removeActive() {
  headerLinks.forEach((navLink) => {
    navLink.classList.remove('activeNav');
  });
}

function activeNavLinks() {
  let count = 0;
  const docTitle = document.title.toLowerCase().split(' ');
  headerLinks.forEach((link) => {
    const linkTitle = link.textContent.toLowerCase();
    for (let x = 0; x < docTitle.length; x++) {
      if (linkTitle === docTitle[x]) {
        count++;
        break;
      }
    }
    if (count === 1) {
      activeLink(link);
    } else {
      removeActive();
    }
  });
}
