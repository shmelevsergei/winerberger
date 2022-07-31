'use strict'

$(function() {

  $('.cards__slider').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 1000,
    dots: true,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
    ]
  });

  $('.promo__slider').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
    swipe: false,
    pauseOnHover: false,
    pauseOnFocus: false
  });

  $('.steps__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1160,
      settings: {
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        arrows: false,
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 767,
      settings: {
        arrows: false,
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: true
      }
    }
    ]
  });

  $('.construction__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true,
        arrows: false
      }
    }
    ]
  });

  $('.catalog__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        infinite: true,
      }
    },
    {
      breakpoint: 800,
      settings: {
        arrows: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    }
    ]
  });

  $('.news__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows:false,
        dots: true
      }
    }
    ]
  });

})

window.addEventListener('DOMContentLoaded', function(){
  //Burger active
  let burger = document.querySelector('.header__burger'),
      menu = document.querySelector('.header__menu'),
      content = document.querySelector('.body'); 

    function toggleActive() {
      burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        menu.classList.toggle('active');
        content.classList.toggle('lock');
      })
    }
    toggleActive();

    //Form 

  const form = document.getElementById('form');
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


