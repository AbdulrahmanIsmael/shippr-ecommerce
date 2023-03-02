export const copyrightyear = () => {
  let currentYear = new Date().getFullYear();
  document.getElementById('year').innerHTML = currentYear;
};
