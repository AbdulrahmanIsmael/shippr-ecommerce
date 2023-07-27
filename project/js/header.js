'use strict';

//TODO: Change the home page if the user is logged in
export function openProfileMenu() {
  const userNameHomePage = document.querySelector(
    '.nav-icons > li:first-of-type > a > div'
  );
  const profileMenu = document.querySelector('.profile-menu');

  userNameHomePage.parentElement.parentElement.addEventListener('click', e => {
    e.preventDefault();
    userNameHomePage.parentElement.removeAttribute('href');
    profileMenu.classList.toggle('close');
  });
}

export function logOutProfile() {
  const profileLink = document.querySelector('.profile-link');
  const logOutBtn = document.querySelector('.logout-link');

  logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
  profileLink.addEventListener('click', () => {
    location.href = './profile.html';
  });
}

export function userHomePage() {
  const localStorageUsername = localStorage.getItem('username');
  const userNameHomePage = document.querySelector(
    '.nav-icons > li:first-of-type > a > div'
  );
  const localStoragePassword = localStorage.getItem('password');

  if (localStoragePassword) {
    userNameHomePage.innerHTML = localStorageUsername;
    openProfileMenu();
    logOutProfile();
  }
}

//TODO: Profile of the user
export function profileOfUser() {
  const profileLink = document.querySelector('.profile-link');

  profileLink.addEventListener('click', () => {
    if (localStorage.getItem('password')) {
      location.href = './profile.html';
    }
  });
}

//TODO: Setting active class to links
export function removeActive(links) {
  links.forEach(Link => {
    Link.classList.remove('activeNav');
  });
}

export function activeNavLinks() {
  const headerLinks = document.querySelectorAll('.nav-links > li > a');

  const docTitle = document.title.toLowerCase();
  headerLinks.forEach(link => {
    const linkPattern = new RegExp(link.innerText.toLowerCase(), 'g');
    if (linkPattern.test(docTitle)) {
      removeActive(headerLinks);
      link.classList.add('activeNav');
    }
  });
}

// TODO: Responsive menu setup
export function expandMenu() {
  const showIcon = document.querySelector('.res-show');
  const showMenu = document.querySelector('.res-menu');

  showIcon.addEventListener('click', () => {
    if (!showMenu.classList.contains('show-res-menu')) {
      showMenu.style.display = 'block';
      setTimeout(() => {
        showMenu.classList.add('show-res-menu');
      }, 100);
      logInOut();
    } else {
      showMenu.classList.remove('show-res-menu');
      setTimeout(() => {
        showMenu.style.display = 'none';
      }, 400);
    }
  });
}

export function logInOut() {
  const loggingInOut = document.getElementById('log-in-out');
  const fav = document.getElementById('fav-btn');
  const favBtn = document.getElementById('fav-button');
  const cartBtn = document.getElementById('cart-button');
  const catBtn = document.getElementById('cat-button');
  const cat = document.getElementById('cat-btn');
  const cart = document.getElementById('cart-btn');
  const profile = document.getElementById('profile-btn');

  if (localStorage.getItem('password')) {
    profile.style.display = 'block';
    loggingInOut.innerHTML = 'Log Out';
    logOut(loggingInOut);
    loggingInOut.removeAttribute('href');
  } else {
    profile.style.display = 'none';
    loggingInOut.innerHTML = 'Log In';
    toLogIn([fav, cat, cart, favBtn, cartBtn, catBtn, loggingInOut]);
  }
}

export function logOut(logBtn) {
  if ((logBtn.innerHTML = 'Log Out')) {
    logBtn.addEventListener('click', () => {
      localStorage.clear();
      location.href = '../home.html';
    });
  }
}

export function toLogIn(btns) {
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btn.removeAttribute('href');
      location.href = '../logIn.html';
    });
  });
}
