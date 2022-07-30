$(function() {

  $('.cards__slider').slick({
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 1000,
    dots: true
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
    slidesToScroll: 1
  });

  $('.construction__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1
  });

  $('.catalog__slader').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1
  });

  $('.news__slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1
  });

})