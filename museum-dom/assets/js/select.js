export function select(className) {
  const select = document.querySelector(className);
  const select_list = select.querySelector(className+'_list');


  select.addEventListener('click', function (e) {
    if(select_list.classList.contains('display_block') ){
      select.querySelector(className+'_val').innerText = e.target.innerText;
      select_list.classList.remove('display_block');
      this.classList.remove('active');
    }
    else {
      this.classList.add('active');
      select_list.classList.add('display_block');
    }
  });

  document.addEventListener('click', function (e) {
    if( e.target.className !== 'buytform__selectstyle_val' ){
      select_list.classList.remove('display_block');
      select.classList.remove('active');
    }
  });

}
