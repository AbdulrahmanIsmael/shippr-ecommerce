import { copyrightyear } from './footer.js';
copyrightyear();

// Define DOM Nodes
const registerPage = document.querySelector('.register');
const inputs = document.querySelectorAll(
  '.login-form > input:not(:last-of-type)'
);
const showPassword = document.getElementById('show');
const loginBtn = document.getElementById('login-btn');
const errorMsg = document.querySelector('.error-form');
const password = document.getElementById('password');
const username = document.getElementById('username');

//TODO: password input visibility system
passwordVisible();
function passwordVisible() {
  showPassword.addEventListener('click', (e) => {
    if (e.target.checked) {
      password.type = 'text';
    } else if (!e.target.checked) {
      password.type = 'password';
    }
  });
}

//TODO: Check if all the inputs are filled
inputsCheck();

function inputsCheck() {
  loginBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let filledInputs = 2;
    inputs.forEach((input) => {
      if (input.value === '') {
        filledInputs--;
      }
    });
    if (!filledInputs) {
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
  registerPage.addEventListener('click', () => {
    location.href = '../register.html';
  });
}

//TODO: Login System
logInSystem();

function usernameWrongMsg() {
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
  loginBtn.addEventListener('click', () => {
    if (
      username.value === localStorage.getItem('username') &&
      password.value === localStorage.getItem('password')
    ) {
      console.log('You are logged in!');
      location.href = '../home.html';
    }
    if (username.value !== localStorage.getItem('username')) {
      usernameWrongMsg();
    }
    if (password.value !== localStorage.getItem('password')) {
      passwordWrongMsg();
    }
  });
}
