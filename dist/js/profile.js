import { copyrightyear } from './footer.js';
copyrightyear();

// Define DOM Nodes
const addressBoxInfo = document.querySelector('.address');
const tabBtns = document.querySelectorAll('.tabs > div');
const tabsContent = document.querySelectorAll('.tab-content > div');
const insertAddressBtn = document.querySelector('.add-address');
const addressForm = document.getElementById('address-form');
const overlay = document.querySelector('.overlay');
const closeForm = document.getElementById('xmark-form');
const firstName = document.getElementById('first-name');
const lastName = document.getElementById('last-name');
const country = document.getElementById('country');
const city = document.getElementById('city');
const street = document.getElementById('street');
const mobile = document.getElementById('mobile');
const addBtn = document.querySelector('.add-btn');
const addressError = document.querySelector('.address-error');
const updatePasswordBtn = document.querySelector('.update-password-btn');
const updatePassword = document.getElementById('update-password');
const xmarkPassword = document.getElementById('xmark-password');
const newUsername = document.getElementById('new-username');
const updateUsernameBtn = document.querySelector('button.update-username-btn');
const newEmail = document.getElementById('new-email');
const updateEmailBtn = document.querySelector('button.update-email-btn');
const changePasswordBtn = document.getElementById('change-password');

//TODO: set click event on the tabs buttons
tabBtn();

function addHideContent(target) {
  tabsContent.forEach((tab) => {
    tab.classList.remove('show-tab');
    setTimeout(() => {
      tab.classList.add('hide-content');
    }, 300);
  });
  setTimeout(() => {
    target.classList.remove('hide-content');
  }, 400);
  setTimeout(() => {
    target.classList.add('show-tab');
  }, 500);
}

function addActiveClass(target) {
  tabBtns.forEach((btn) => {
    btn.classList.remove('active-tab');
  });
  target.classList.add('active-tab');
}

function tabBtn() {
  tabBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      tabsContent.forEach((tab) => {
        if (e.target.dataset.content === tab.dataset.content) {
          addActiveClass(e.target);
          addHideContent(tab);
        }
      });
    });
  });
}

//TODO: Inserting Address System
addAddressForm();
if (localStorage.getItem('name')) {
  confirmAddressBox();
}
changePassword();

if (document.querySelector('.address-delete')) {
  const addressDelete = document.querySelector('.address-delete');
  deleteAddress(addressDelete);
}

function closeAddressForm(target) {
  target.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.remove('overlay-show');
  }, 200);
}

function formValidation() {
  if (
    firstName.value &&
    lastName.value &&
    country.value &&
    city.value &&
    street.value &&
    mobile.value
  ) {
    localStorage.setItem('name', `${firstName.value} ${lastName.value}`);
    localStorage.setItem('country', `${country.value}`);
    localStorage.setItem('city', `${city.value}`);
    localStorage.setItem('street', `${street.value}`);
    localStorage.setItem('mobile', `${mobile.value}`);
    return true;
  }

  return false;
}

function confirmAddressBox() {
  const name = localStorage.getItem('name');
  const country = localStorage.getItem('country');
  const city = localStorage.getItem('city');
  const street = localStorage.getItem('street');
  const mobile = localStorage.getItem('mobile');
  let addressBox = `
        <div class="address-box">
          <div class="address-box-information">
            <h2>${name}</h2>
            <div>
              <p class="country-city">${country} - ${city}</p>
              <p class="street-name">${street}</p>
              <p class="mobile">${mobile}</p>
            </div>
          </div>
          <button class="address-delete"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;

  addressBoxInfo.innerHTML += addressBox;
}

function showAddressError() {
  addressError.innerHTML = 'Please Insert All The Information Above';
  setTimeout(() => {
    addressError.innerHTML = '';
  }, 2500);
}

function addAddressForm() {
  insertAddressBtn.addEventListener('click', () => {
    if (!addressForm.classList.contains('show')) {
      overlay.style.display = 'block';
      overlay.classList.add('overlay-show');
      setTimeout(() => {
        addressForm.classList.add('show');
      }, 200);
    }
  });

  closeForm.addEventListener('click', () => {
    closeAddressForm(addressForm);
  });

  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (formValidation() && localStorage.getItem('name')) {
      formValidation();
      location.reload();
      closeAddressForm(addressForm);
    } else {
      showAddressError();
    }
  });
}

function deleteAddress(deleteBtn) {
  deleteBtn.addEventListener('click', () => {
    localStorage.removeItem('name');
    localStorage.removeItem('country');
    localStorage.removeItem('city');
    localStorage.removeItem('street');
    localStorage.removeItem('mobile');
    location.reload();
  });
}

function changePassword() {
  updatePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!updatePassword.classList.contains('show')) {
      overlay.style.display = 'block';
      overlay.classList.add('overlay-show');
      setTimeout(() => {
        updatePassword.classList.add('show');
      }, 200);
    }
  });

  xmarkPassword.addEventListener('click', () => {
    closeAddressForm(updatePassword);
  });
}

//TODO: Validation of the updated username & email
//* username *//
validateUsername();

function usernameMsgError() {
  newUsername.value = '';
  newUsername.classList.add('error-input');
  newUsername.placeholder =
    'username contains: at least 8 characters length & 2 numbers';
  newUsername.addEventListener('click', () => {
    newUsername.placeholder = 'New Username';
    newUsername.classList.remove('error-input');
  });
}

function validateUsername() {
  updateUsernameBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const newUsernameValue = newUsername.value.split('');
    let numbersUserName = 0;
    newUsernameValue.forEach((item) => {
      if (!isNaN(parseInt(item))) {
        numbersUserName++;
      }
    });
    if (numbersUserName < 2 || newUsernameValue.length < 8) {
      usernameMsgError();
    }
    if (numbersUserName >= 2 && newUsernameValue.length >= 8) {
      localStorage.setItem('username', newUsername.value);
    }
  });
}

//* Email *//
emailCheck();

function newEmailMsgError() {
  newEmail.value = '';
  newEmail.classList.add('error-input');
  newEmail.placeholder = 'Wrong Email, Please Enter An Right One!';
  newEmail.addEventListener('click', () => {
    newEmail.classList.remove('error-input');
    newEmail.placeholder = 'New Email';
  });
}

function emailCheck() {
  const emailPattern = /\w+@[a-z]+\.[a-z]{2,3}/;
  updateEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!newEmail.value.match(emailPattern)) {
      newEmailMsgError();
    } else if (newEmail.value.match(emailPattern)) {
      localStorage.setItem('email', newEmail.value);
    }
  });
}

//TODO: Change the Password
changePasswordProcess();

function passwordMsgError(password, msg, oldMsg) {
  password.value = '';
  password.classList.add('error-input');
  password.placeholder = msg;
  password.addEventListener('click', () => {
    password.classList.remove('error-input');
    password.placeholder = oldMsg;
  });
}

function changingPasswordValidation(old, cOld, newPass, cNew) {
  const passwordPattern1 = /\d+/;
  const passwordPattern2 = /[A-Z]+/;
  const passwordPattern3 = /[a-z]+/;
  let valCount = 0;
  // Validation Confimation
  if (old === localStorage.getItem('password') && cOld === old) {
    valCount++;
  }

  if (
    newPass.value.match(passwordPattern1) ||
    newPass.value.match(passwordPattern2) ||
    newPass.value.match(passwordPattern3) ||
    newPass.value.length >= 8
  ) {
    valCount++;
  }

  if (valCount === 2) {
    localStorage.setItem('password', newPass);
  }

  if (old !== localStorage.getItem('password')) {
    // Error Msgs
    passwordMsgError(old, 'password is wrong', 'Old Password');
  }

  if (cOld !== old) {
    passwordMsgError(
      cOld,
      'No match, confirmation failed',
      'Confirm Old Password'
    );
  }

  if (
    !newPass.value.match(passwordPattern1) ||
    !newPass.value.match(passwordPattern2) ||
    !newPass.value.match(passwordPattern3) ||
    newPass.value.length < 8
  ) {
    passwordMsgError(
      newPass,
      'include at least 1 num and one uppercase',
      'New Password'
    );
  }

  if (cNew !== newPass) {
    passwordMsgError(
      cNew,
      'No match, confirmation failed',
      'Confirm New Password'
    );
  }
}

function changePasswordProcess() {
  const oldPassword = document.getElementById('old-password');
  const confirmOldPassword = document.getElementById('confirm-old-password');
  const newPassword = document.getElementById('new-password');
  const confirmNewPassword = document.getElementById('confirm-new-password');
  changePasswordBtn.addEventListener('click', (e) => {
    e.preventDefault();

    changingPasswordValidation(
      oldPassword,
      confirmOldPassword,
      newPassword,
      confirmNewPassword
    );
  });
}
