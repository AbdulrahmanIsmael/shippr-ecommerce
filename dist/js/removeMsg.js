function showRemoveMsg() {
  const removeMsg = document.querySelector('.remove-msg');

  removeMsg.classList.add('remove-msg-show');
  setTimeout(() => {
    removeMsg.classList.remove('remove-msg-show');
  }, 2000);
}

export { showRemoveMsg };
