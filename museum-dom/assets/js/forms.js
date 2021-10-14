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
  // --------------
  //set in big form
  const formbig = document.querySelector('.buytickets__form');
  formbig.querySelector('#form__numb_basic18_2').value = tickets_basic18;
  formbig.querySelector('#form__numb_senior65_2').value = tickets_senior65;
  formbig.querySelector('#buytform__count_tickes_basic').innerHTML = tickets_basic18;
  formbig.querySelector('#buytform__count_tickes_senior').innerHTML = tickets_senior65;
  formbig.querySelector('#buytform__cost_tickes_basic').innerHTML = ticket_type_value * tickets_basic18_rate;
  formbig.querySelector('#buytform__cost_tickes_basic_2').innerHTML = ticket_type_value * tickets_basic18_rate;
  formbig.querySelector('#buytform__cost_tickes_senior').innerHTML = ticket_type_value * tickets_senior65_rate;
  formbig.querySelector('#buytform__cost_tickes_senior_2').innerHTML = ticket_type_value * tickets_senior65_rate;
  formbig.querySelector('#buytform__sum_tickes_basic').innerHTML = ticket_type_value * tickets_basic18 * tickets_basic18_rate;
  formbig.querySelector('#buytform__sum_tickes_senior').innerHTML = ticket_type_value * tickets_senior65 * tickets_senior65_rate;
  formbig.querySelector('#form2_total_sum').innerHTML = all_sum;

  formbig.querySelector('.form2_type_tickets_select').innerHTML = 'text';

  // buytform__sum_tickes_basic
  // buytform__sum_tickes_senior

  // buytform__count_tickes_basic
  // buytform__count_tickes_senior
  // buytform__cost_tickes_basic
  // buytform__cost_tickes_senior

}
updateSmallForm();
// --------------------------------------------
//
const mindate = new Date().toISOString().split('T')[0];
const datetickets = document.querySelector('.buytform__input_date');
datetickets.setAttribute('min', mindate);


// --------------------------------------------

