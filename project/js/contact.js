const call = document.getElementById('call');
const reqCall = document.getElementById('show');

showReq();

function showReq() {
  reqCall.addEventListener('click', () => {
    call.classList.toggle('req');
  });
}
