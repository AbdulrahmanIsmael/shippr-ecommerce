import { copyrightyear } from './footer.js';
import { expandMenu, logOut, toLogIn, logInOut } from './header.js';
copyrightyear();
expandMenu();
logInOut();

// Define DOM Nodes
const password = document.getElementById('password');

//TODO: password input visibility system
passwordVisible();
function passwordVisible() {
  const showPassword = document.getElementById('show');

  showPassword.addEventListener('click', e => {
    if (e.target.checked) {
      password.type = 'text';
    } else if (!e.target.checked) {
      password.type = 'password';
    }
  });
}

//TODO: Check if all the inputs are filled
inputsCheck();

function openProfile() {
  if (logInSystem()) {
    location.href = './home.html';
  }
}

function checkInputsStatus(inputs) {
  let filled = true;
  inputs.forEach(input => {
    if (!input.value) {
      filled = false;
    }
  });
  return filled;
}

function inputsCheck() {
  const inputs = document.querySelectorAll(
    '.login-form > input:not(:last-of-type)'
  );
  const loginBtn = document.getElementById('login-btn');
  const errorMsg = document.querySelector('.error-form');

  loginBtn.addEventListener('click', e => {
    e.preventDefault();

    if (!checkInputsStatus(inputs)) {
      console.log('empty');
      errorMsg.classList.add('show-error');
      setTimeout(() => {
        errorMsg.classList.remove('show-error');
      }, 2000);
    }
  });
}

//TODO: Link to register page
registerPageMove();

function registerPageMove() {
  const registerPage = document.querySelector('.register');

  registerPage.addEventListener('click', () => {
    location.href = './register.html';
  });
}

//TODO: Login System
logInSystem();

function usernameWrongMsg() {
  const username = document.getElementById('username');

  username.value = '';
  username.classList.add('error-input');
  username.placeholder = 'Wrong username, Please enter the right username';
  username.addEventListener('click', () => {
    username.classList.remove('error-input');
    username.placeholder = 'User Name';
  });
}

function passwordWrongMsg() {
  password.value = '';
  password.classList.add('error-input');
  password.placeholder = 'Wrong Password, Please enter the right password';
  password.addEventListener('click', () => {
    password.classList.remove('error-input');
    password.placeholder = 'Password';
  });
}

function logInSystem() {
  const username = document.getElementById('username');
  const loginBtn = document.getElementById('login-btn');

  loginBtn.addEventListener('click', () => {
    if (
      username.value === localStorage.getItem('username') &&
      password.value === localStorage.getItem('password')
    ) {
      location.href = './home.html';
    }
    if (username.value !== localStorage.getItem('username')) {
      usernameWrongMsg();
    }
    if (password.value !== localStorage.getItem('password')) {
      passwordWrongMsg();
    }
  });
}
