//TODO: Change the home page if the user is logged in
export function openProfileMenu() {
  const userNameHomePage = document.querySelector(
    '.nav-icons > li:first-of-type > a > div'
  );
  const profileMenu = document.querySelector('.profile-menu');

  userNameHomePage.parentElement.parentElement.addEventListener(
    'click',
    (e) => {
      e.preventDefault();
      userNameHomePage.parentElement.removeAttribute('href');
      profileMenu.classList.toggle('close');
    }
  );
}

export function logOutProfile() {
  const profileLink = document.querySelector('.profile-link');
  const logOutBtn = document.querySelector('.logout-link');

  logOutBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
  });
  profileLink.addEventListener('click', () => {
    location.href = './profile.html'; //! Do not forget to create profile page
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
  links.forEach((Link) => {
    Link.classList.remove('activeNav');
  });
}

export function activeNavLinks() {
  const headerLinks = document.querySelectorAll('.nav-links > li > a');

  const docTitle = document.title.toLowerCase();
  headerLinks.forEach((link) => {
    const linkPattern = new RegExp(link.innerText.toLowerCase(), 'g');
    if (linkPattern.test(docTitle)) {
      removeActive(headerLinks);
      link.classList.add('activeNav');
    }
  });
}
