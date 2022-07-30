"use strict"

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form');
  console.log(form);
  form.addEventListener('submit', formSend);

  async function formSend(e) {
    e.preventDefault();

    let error = formValidate(form);

    let formData = new FormData(form);
    

    if (error === 0) {
      form.classList.add('_sending');

      let response = await fetch('sendmail.php', {
        method: 'POST',
        body: formData
      });
      if (response.ok) {
        let result = await response.json();
        alert(result.message);
        form.reset();
        form.classList.remove('_sending');
      } else {
        alert("Ошибка отправки данных");
        form.classList.remove('_sending');
      }
    } else {
      alert('Заполните обязательные поля');
    }
  }


  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll('._req');

    for (let i = 0; i < formReq.length; i++) {
      const input = formReq[i];
      formRemoveError(input);

      if (input.classList.contains('_email')) {
        if (emailTest(input)) {
          formAddError(input); 
          error++;
        }
      } else if(input.classList.contains('_phone')) {
          if (phoneTest(input)) {
            formAddError(input); 
            error++;
          }
      } else if(input.getAttribute("type") === "checkbox" && input.checked === false) {
        formAddError(input); 
        error++;
      } else {
        if (input.value === '') {
          formAddError(input); 
          error++;
        }
      }
    }

    return error;
  }

  function formAddError(input) {
    input.parentElement.classList.add('_error');
    input.classList.add('_error');
  }
  function formRemoveError(input) {
    input.parentElement.classList.remove('_error');
    input.classList.remove('_error');
  }

  //Проверка Email 
  function emailTest(input) {
    return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }

  //проверка телефона 
  function phoneTest(input) {
    return !/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(input.value);
  }
});