// console.log('Init!');

// inputmask
const form = document.querySelector('.auth__form');
const auth = document.querySelector('.auth');
// const telSelector = form.querySelector('input[type="tel"]');
// const inputMask = new Inputmask('+7 (999) 999-99-99');
// inputMask.mask(telSelector);

if (form) {

  // eslint-disable-next-line no-undef
  const validation = new JustValidate('#js-auth', {
    errorFieldCssClass: 'is-invalid',
    successFieldCssClass: 'is-valid',
  });
  const messageSuccess = document.querySelector('.js-message-success');
  const messageError = document.querySelector('.js-message-error');

  validation
    .addField('.js-auth-name', [{
      rule: 'minLength',
      value: 3,
      errorMessage: 'Должно быть не меньше 3-х символов'
    },
    {
      rule: 'maxLength',
      value: 50,
      errorMessage: 'Должно быть не более 30-ти символов'
    },
    {
      rule: 'required',
      value: true,
      errorMessage: 'Введите выше имя имя!'
    }
    ])

    .addField('.js-auth-email', [{
      rule: 'required',
      value: true,
      errorMessage: 'Введите ваш Email!',
    },
    {
      rule: 'email',
      value: true,
      errorMessage: 'Введите корректный Email!',
    },
    ])

    .addField('.js-auth-phone', [{
      rule: 'required',
      value: true,
      errorMessage: 'Введите ваш Телефон!',
    }]).onSuccess((event) => {
      // console.log('Validation passes and form submitted', event);

      const formData = new FormData(event.target);
      // console.log(...formData);

      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        form.classList.add('is-sending');
        if (xhr.readyState === 4) {
          auth.classList.add('is-send');
          if (xhr.status === 200) {
            // console.log('Отправлено');
            form.classList.remove('is-sending');
            messageSuccess.classList.add('is-active');
          } else {
            messageError.classList.add('is-active');
          }
        }
      };

      xhr.open('POST', '../lib/php/sendmail.php', true);
      xhr.send(formData);

      event.target.reset();
    });

}
