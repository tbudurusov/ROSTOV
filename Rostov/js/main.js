// модальное окно
$(document).ready(function () {
  var modal = $('.modal-one'),
  modalSuc = $('.modal__succsess'),
  modalSucClose = $('.modal__succsess__close'),
  modalBtn = $('[data-toggle=modal]'),
  closeBtn = $('.modal__close'),
  missModal = $('.modal');
  
  modalBtn.on('click', function () {
    modal.toggleClass('modal--visible');
  });
  closeBtn.on('click', function() {
    modal.toggleClass('modal--visible');
  });
  missModal.on('dblclick', function(){
    modal.toggleClass('modal--visible');
  });

  $(document).keyup(function(e) {
    if (e.key === "Escape" || e.keyCode === 27) {
      modal.toggleClass('modal--visible');
    }
  });

  const swiper = new Swiper('.swiper-container', {
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

  });

  var next = $('.swiper-button-next');
  var prev = $('.swiper-button-prev');
  var bullets = $('.swiper-pagination')

  bullets.css('left', prev.width() + 10)
  next.css('left', prev.width() + 10 + bullets.width() + 10 +bullets.width())

  new WOW().init();

  // валидация форма
  $('.modal__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 3,
        maxlength: 15
      },
      userPhone: "required",
      // правило-объект (блок)
      userEmail: {
        required: true,
        email: true
      }
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле" ,
        minlength: "Имя не короче 3 букв",
        maxlength: "Имя не больше 15 букв"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Введите корректный email",
        email: "Введите в формате: name@domain.com"
      }
    },
    submitHandler: function(form) {
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(form).serialize(),
        success: function (response) {
          console.log('Ajax сработал. Ответ сервера: ' + response);
          // alert('Форма отправлена, мы свяжемся с вами через 15 минут');
          $(form)[0].reset();
          modal.removeClass('modal--visible');
          modalSuc.toggleClass('modal--visible');
          setTimeout(function(i){$(modalSuc).removeClass('modal--visible');}, 10000);
        },
        error: function (response) {
          console.error('Ошибка запроса: ' + response)
        },
      });
    },
  });

  $('.control__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 3,
        maxlength: 15
      },
      userPhone: "required",
      // правило-объект (блок)
      userEmail: {
        required: "Введите корректный email",
        email: true
      }
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле" ,
        minlength: "Имя не короче 3 букв",
        maxlength: "Имя не больше 15 букв"
      },
      userPhone: "Телефон обезателен",
    },
  });

  $('.footer__form').validate({
    errorClass: "invalid",
    errorElement: "div",
    rules: {
      // строчное правило
      userName: {
        required: true,
        minlength: 3,
        maxlength: 15
      },
      userPhone: "required",
      // правило-объект (блок)
      userEmail: {
        required: "Введите корректный email",
        email: true
      },
      userQuestion : {
        required: true,
        maxlength: 300
      }
    }, // сообщения
    messages: {
      userName: {
        required: "Заполните поле" ,
        minlength: "Имя не короче 3 букв",
        maxlength: "Имя не больше 15 букв"
      },
      userPhone: "Заполните поле",
      userEmail: {
        required: "Введите корректный email",
        email: "Введите в формате: name@domain.com"
      },
      userQuestion : {
        required: "Вы не вели сообщения"
      }
    },
  });

  // маски
  // маска для телефона
  $('[type=tel]').mask('+7(000)000-00-00', {placeholder: "+7(___)___-__-__"});

  ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
            center: [47.244621, 39.723167],
            zoom: 18
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создаём макет содержимого.
        MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
            '<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
        ),

        myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            hintContent: 'Наш офис находиться на втором этаже',
            balloonContent: 'Вход со стоянки'
        }, {
            // Опции.
            // Необходимо указать данный тип макета.
            iconLayout: 'default#image',
            // Своё изображение иконки метки.
            iconImageHref: '../img/location.png',
            // Размеры метки.
            iconImageSize: [32, 32],
            // Смещение левого верхнего угла иконки относительно
            // её "ножки" (точки привязки).
            iconImageOffset: [-5, -38]
        });

    myMap.geoObjects
        .add(myPlacemark);
});

});

// кнопка наверх
$(document).ready(function(){
  $(window).scroll(function () {
      if ($(this).scrollTop() > 50) {
          $('#button-up').fadeIn();
      } else {
          $('#button-up').fadeOut();
      }
  });
  $('#button-up').click(function () {
      $('body,html').animate({
          scrollTop: 0
      }, 1200);
      return false;
  });

});