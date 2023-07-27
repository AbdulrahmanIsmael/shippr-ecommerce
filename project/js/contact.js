function showReq() {
  const call = document.getElementById('call');
  const reqCall = document.getElementById('show');
  reqCall.addEventListener('click', () => {
    call.classList.toggle('req');
  });
}
showReq();

//TODO: show message after sending the user personal details
export function confirmUserDetails() {
  const contactMsg = document.querySelector('.contact-msg');
  const errorMsg = document.querySelector('.error-msg');
  const submitBtn = document.getElementById('submit');
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const phoneNum = document.querySelector('#phone > input');

  const phonePattern = /(\+2)?(01[1025])(\d{8})/g;

  submitBtn.addEventListener('click', e => {
    e.preventDefault();

    if (name.value && (email.value || phonePattern.test(phoneNum.value))) {
      contactMsg.classList.add('contact-msg-show');
      setTimeout(() => {
        contactMsg.classList.remove('contact-msg-show');
      }, 2000);
    } else {
      errorMsg.classList.add('error-msg-show');
      setTimeout(() => {
        errorMsg.classList.remove('error-msg-show');
      }, 2000);
    }
  });
}
