const form = document.querySelector('#js-auth');

if (form) {
  form.setAttribute('novalidate', '');
  form.addEventListener('submit', formSend);
}

async function formSend(e) {
  e.preventDefault();
  const error = formValidate(form);

  const formData = new FormData(form);

  if (error === 0) {
    form.classList.add('auth__form--sending');

    const respanse = await fetch('lib/php/sendmail.php', {
      method: 'POST',
      body: formData
    });

    if (respanse.ok) {
      const result = await respanse.json();
      alert(result.message);
      form.reset();
      form.classList.remove('auth__form--sending');
    } else {
      alert('Ошибка');
      form.classList.remove('auth__form--sending');
    }
  }
}

function formValidate() {
  let err = 0;
  const formReq = document.querySelectorAll('.auth__form-field[required]');

  for (let i = 0; i < formReq.length; i++) {
    const input = formReq[i];
    formRemoveError(input);

    if (input.classList.contains('js-auth-email')) {
      if (emailTest(input)) {
        formAddError(input);
        err++;
      }
    } else if (input.classList.contains('js-auth-phone')) {
      if (input.value.length < 5) {
        formAddError(input);
        err++;
      }
    } else {
      if (input.value === '') {
        formAddError(input);
        err++;
      }
    }
  }
  return err;
}

function formAddError(input) {
  input.parentElement.classList.add('auth__error');
  input.classList.add('auth__error');
}

function formRemoveError(input) {
  input.parentElement.classList.remove('auth__error');
  input.classList.remove('auth__error');
}

function emailTest(input) {
  // eslint-disable-next-line no-useless-escape
  return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
}
