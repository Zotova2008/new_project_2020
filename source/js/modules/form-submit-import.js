import JustValidate from 'just-validate';

export const initValidate = function () {
  // Валидация для формы в футере
  const footerForm = document.querySelectorAll('.footer__form form');
  const footerFormBox = document.querySelector('.footer__form');

  const modalForm = document.querySelectorAll('.modal__form form');
  const modalFormBox = document.querySelector('.modal__form');

  if (footerForm) {
    const validate = new JustValidate('.footer__form form', {
      errorFieldCssClass: 'is-invalid',
      successFieldCssClass: 'is-valid',
    });

    // const messageSuccess = document.querySelector('.js-message-success');
    // const messageError = document.querySelector('.js-message-error');

    validate
      .addField('#name', [{
        rule: 'minLength',
        value: 3,
        errorMessage: 'Должно быть не меньше 3-х символов'
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Должно быть не более 50-ти символов'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите выше имя!'
      }
      ])
      .addField('#email', [{
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
      .addField('#tel', [{
        rule: 'required',
        value: true,
        errorMessage: 'Введите ваш Телефон!',
      }]).onSuccess((event) => {
        const formData = new FormData(event.target);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          footerFormBox.classList.add('is-sending');
          if (xhr.readyState === 4) {
            footerFormBox.classList.remove('is-sending');
            footerFormBox.classList.add('is-send');
            if (xhr.status === 200) {
              footerFormBox.classList.add('is-send-success');
            } else {
              footerFormBox.classList.add('is-send-error');
            }
          }
        };

        xhr.open('POST', '../sendmail.php', true);
        xhr.send(formData);

        event.target.reset();
      });

  }

  if (modalForm) {
    const validate = new JustValidate('.modal__form form', {
      errorFieldCssClass: 'is-invalid',
      successFieldCssClass: 'is-valid',
    });

    // const messageSuccess = document.querySelector('.js-message-success');
    // const messageError = document.querySelector('.js-message-error');

    validate
      .addField('#modal-name', [{
        rule: 'minLength',
        value: 3,
        errorMessage: 'Должно быть не меньше 3-х символов'
      },
      {
        rule: 'maxLength',
        value: 50,
        errorMessage: 'Должно быть не более 50-ти символов'
      },
      {
        rule: 'required',
        value: true,
        errorMessage: 'Введите выше имя!'
      }
      ])
      .addField('#modal-email', [{
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
      .addField('#modal-tel', [{
        rule: 'required',
        value: true,
        errorMessage: 'Введите ваш Телефон!',
      }]).onSuccess((event) => {
        const formData = new FormData(event.target);
        const xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          modalFormBox.classList.add('is-sending');
          if (xhr.readyState === 4) {
            modalFormBox.classList.remove('is-sending');
            modalFormBox.classList.add('is-send');
            if (xhr.status === 200) {
              modalFormBox.classList.add('is-send-success');
            } else {
              modalFormBox.classList.add('is-send-error');
            }
          }
        };

        xhr.open('POST', './sendmail.php', true);
        xhr.send(formData);

        event.target.reset();
      });

  }
};
