// localStorage
function loadLocalStorage(){
  arrStorageData = ['form__numb_basic18','form__numb_senior65'];
  for (let i = 0; i < arrStorageData.length; i++) {
    let value = localStorage.getItem(arrStorageData[i]);
    if(value === null) value = '0';
    document.querySelector('#'+arrStorageData[i]).value = value;
  }
}
loadLocalStorage();
// --------------------------------------------
// small form
function updateSmallForm(){
  const formsmall = document.querySelector('.tickets__form');

  const ticket_type_value = formsmall.elements['ticket_type'].value;
  const tickets_basic18 = formsmall.querySelector('#form__numb_basic18').value;
  const tickets_basic18_rate = formsmall.querySelector('#form__numb_basic18').getAttribute('data-rate');
  const tickets_senior65 = formsmall.querySelector('#form__numb_senior65').value;
  const tickets_senior65_rate = formsmall.querySelector('#form__numb_senior65').getAttribute('data-rate');
  const block_sum = formsmall.querySelector('#total_sum');

  localStorage.setItem('form__numb_basic18', tickets_basic18);
  localStorage.setItem('form__numb_senior65', tickets_senior65);

  let all_sum = ticket_type_value * tickets_basic18 * tickets_basic18_rate + ticket_type_value * tickets_senior65 * tickets_senior65_rate;
  block_sum.innerHTML = all_sum;
}
updateSmallForm();
// --------------------------------------------
