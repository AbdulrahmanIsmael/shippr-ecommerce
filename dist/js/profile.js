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

//TODO: set click event on the tabs buttons
tabBtn();

function addHideContent(target) {
  const tabsContent = document.querySelectorAll('.tab-content > div');
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
  const tabBtns = document.querySelectorAll('.tabs > div');
  tabBtns.forEach((btn) => {
    btn.classList.remove('active-tab');
  });
  target.classList.add('active-tab');
}

function tabBtn() {
  const tabsContent = document.querySelectorAll('.tab-content > div');
  const tabBtns = document.querySelectorAll('.tabs > div');
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
  const overlay = document.querySelector('.overlay');
  target.classList.remove('show');
  setTimeout(() => {
    overlay.style.display = 'none';
    overlay.classList.remove('overlay-show');
  }, 200);
}

function formValidation() {
  const firstName = document.getElementById('first-name');
  const lastName = document.getElementById('last-name');
  const country = document.getElementById('country');
  const city = document.getElementById('city');
  const street = document.getElementById('street');
  const mobile = document.getElementById('mobile');
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
  const addressBoxInfo = document.querySelector('.address');
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
  const addressError = document.querySelector('.address-error');
  addressError.innerHTML = 'Please Insert All The Information Above';
  setTimeout(() => {
    addressError.innerHTML = '';
  }, 2500);
}

function addAddressForm() {
  const insertAddressBtn = document.querySelector('.add-address');
  const addressForm = document.getElementById('address-form');
  const closeForm = document.getElementById('xmark-form');
  const addBtn = document.querySelector('.add-btn');
  const overlay = document.querySelector('.overlay');

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
  const updatePasswordBtn = document.querySelector('.update-password-btn');
  const updatePassword = document.getElementById('update-password');
  const xmarkPassword = document.getElementById('xmark-password');
  const overlay = document.querySelector('.overlay');

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
  const newUsername = document.getElementById('new-username');

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
  const updateUsernameBtn = document.querySelector(
    'button.update-username-btn'
  );
  const newUsername = document.getElementById('new-username');

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
      location.reload();
    }
  });
}

//* Email *//
emailCheck();

function newEmailMsgError() {
  const newEmail = document.getElementById('new-email');

  newEmail.value = '';
  newEmail.classList.add('error-input');
  newEmail.placeholder = 'Wrong Email, Please Enter An Right One!';
  newEmail.addEventListener('click', () => {
    newEmail.classList.remove('error-input');
    newEmail.placeholder = 'New Email';
  });
}

function emailCheck() {
  const newEmail = document.getElementById('new-email');
  const updateEmailBtn = document.querySelector('button.update-email-btn');
  const emailPattern = /\w+@[a-z]+\.[a-z]{2,3}/;
  updateEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();

    if (!newEmail.value.match(emailPattern)) {
      newEmailMsgError();
    } else if (newEmail.value.match(emailPattern)) {
      localStorage.setItem('email', newEmail.value);
      location.reload();
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
  if (
    old.value === localStorage.getItem('password') &&
    cOld.value === old.value
  ) {
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
    localStorage.setItem('password', newPass.value);
    location.reload();
  }

  if (old.value !== localStorage.getItem('password')) {
    // Error Msgs
    passwordMsgError(old, 'password is wrong', 'Old Password');
  }

  if (cOld.value !== old.value) {
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

  if (cNew.value !== newPass.value) {
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
  const changePasswordBtn = document.getElementById('change-password');

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
