export const copyrightyear = () => {
  let currentYear = new Date().getFullYear();
  document.getElementById('year').innerHTML = currentYear;
};

if ((document.title = 'Shippr | About Us')) {
  copyrightyear();
}
