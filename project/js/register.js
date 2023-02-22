import { copyrightyear } from './footer.js';
copyrightyear();

// Define DOM Nodes
const inputs = document.querySelectorAll(
  '.login-form > input:not(:last-of-type)'
);
const showPassword = document.getElementById('show');
const errorMsg = document.querySelector('.error-form');
const registerBtn = document.getElementById('login-btn');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

//TODO: password input visibility system
passwordVisible();
function passwordVisible() {
  showPassword.addEventListener('click', (e) => {
    if (e.target.checked) {
      password.type = 'text';
      confirmPassword.type = 'text';
    } else if (!e.target.checked) {
      password.type = 'password';
      confirmPassword.type = 'password';
    }
  });
}

//TODO: Check if all the inputs are filled
inputsCheck();

function inputsCheck() {
  registerBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let filledInputs = 4;
    let errorInputs = 0;
    inputs.forEach((input) => {
      if (input.value === '') {
        filledInputs--;
      }
      if (input.classList.contains('error-input')) {
        errorInputs++;
      }
    });

    if (filledInputs < 4 || errorInputs > 0) {
      errorMsg.classList.add('show-error');
      setTimeout(() => {
        errorMsg.classList.remove('show-error');
      }, 2000);
    } else {
      console.log('Account has been created');
      location.href = '../logIn.html';
    }
  });
}

//TODO: Validation system
//* Username *//
checkUsername();

function usernameInputMsg() {
  username.value = '';
  username.classList.add('error-input');
  username.placeholder =
    'username contains: at least 8 characters length & 2 numbers';
  username.addEventListener('click', () => {
    username.classList.remove('error-input');
    username.placeholder = 'Enter A User Name';
  });
}

function checkUsername() {
  registerBtn.addEventListener('click', () => {
    const usernameValue = username.value.split('');
    let numbersUserName = 0;
    usernameValue.forEach((item) => {
      if (!isNaN(parseInt(item))) {
        numbersUserName++;
      }
    });

    if (numbersUserName < 2 || usernameValue.length < 8) {
      usernameInputMsg();
    }
    if (numbersUserName >= 2 && usernameValue.length >= 8) {
      localStorage.setItem('username', username.value);
      return true;
    }
  });
}

//* Email *//
emailCheck();

function emailInputMsg() {
  email.value = '';
  email.classList.add('error-input');
  email.placeholder = 'Wrong Email, Please Enter An Right One!';
  email.addEventListener('click', () => {
    email.classList.remove('error-input');
    email.placeholder = 'Enter An Email';
  });
}

function emailCheck() {
  // Pattern to match the email
  const emailPattern = /\w+@[a-z]+\.[a-z]{2,3}/;
  // check if the email value matches the pattern, otherwise show message error
  registerBtn.addEventListener('click', () => {
    if (!email.value.match(emailPattern)) {
      emailInputMsg();
    } else if (email.value.match(emailPattern)) {
      localStorage.setItem('email', email.value);
      return true;
    }
  });
}

//* Password *//
checkPassword();

function passwordInputMsg() {
  password.value = '';
  password.classList.add('error-input');
  password.placeholder =
    'Password contains: at least 1 number and an uppercase letter';
  password.addEventListener('click', () => {
    password.classList.remove('error-input');
    password.placeholder = 'Enter A Password';
  });
}

function checkPassword() {
  const passwordPattern1 = /\d+/;
  const passwordPattern2 = /[A-Z]+/;
  const passwordPattern3 = /[a-z]+/;

  registerBtn.addEventListener('click', () => {
    if (
      !password.value.match(passwordPattern1) ||
      !password.value.match(passwordPattern2) ||
      !password.value.match(passwordPattern3) ||
      password.value.length < 8
    ) {
      passwordInputMsg();
    }
  });
}

//* Confirm Password *//
checkConfirmPassword();
function confirmPasswordInputMsg() {
  confirmPassword.value = '';
  confirmPassword.classList.add('error-input');
  confirmPassword.placeholder = "This Password doesn't match your password";
  confirmPassword.addEventListener('click', () => {
    confirmPassword.classList.remove('error-input');
    confirmPassword.placeholder = 'Confirm Your Password';
  });
}

function checkConfirmPassword() {
  registerBtn.addEventListener('click', () => {
    if (password.value !== confirmPassword.value) {
      localStorage.removeItem('password', password.value);
      confirmPasswordInputMsg();
    } else {
      localStorage.setItem('password', password.value);
    }
  });
}
