import { copyrightyear } from './footer.js';
copyrightyear();

// Define DOM Nodes
const instructions = document.querySelectorAll('.instruction > div');

//TODO: expand instructions
expandInstruction();

function expandInstruction() {
  instructions.forEach((ins) => {
    ins.addEventListener('click', (e) => {
      const row = e.target.firstElementChild;
      const textDetailed = e.target.nextElementSibling;
      row.classList.toggle('open');
      if (row.classList.contains('open')) {
        textDetailed.classList.remove('closeReview');
        e.target.style.borderBottom = '0';
      } else {
        textDetailed.classList.add('closeReview');
        e.target.style.borderBottom = '1px solid #888';
      }
    });
  });
}
