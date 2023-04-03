
const baseSuccessCallback = (event) => {
  event.preventDefault();
  // В данном колбеке бэкендер, либо разработчик при необходимости будет писать запрос на отправку формы на сервер и обрабатывать возможные ошибки или успешную отправку формы на сервер
  const formData = new FormData(event.target);
  const parent = event.target.closest('[data-form-validate]');
  // выведет список с данными
  // console.log(Array.from(formData.entries()));

  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    parent.classList.add('is-sending');
    if (xhr.readyState === 4) {
      // console.log('send');
      parent.classList.remove('is-sending');
      parent.classList.add('is-send');
      if (xhr.status === 200) {
        parent.classList.add('is-success');
      } else {
        parent.classList.add('is-error');
      }
    }
  };

  xhr.open('POST', '../lib/php/sendmail.php', true);
  xhr.send(formData);

  event.target.reset();
};

const baseErrorCallback = (event) => {
  event.preventDefault();
  // Данный коллбек используется при необходимости выполнить какое-либо действие помимо показа ошибок при попытке отправить неккорректные данные, он не связан с запросами на сервер
};

export const callbacks = {
  base: {
    // Сбросс формы
    reset: true,
    // Таймаут сброса формы
    resetTimeout: 500,
    successCallback: baseSuccessCallback,
    errorCallback: baseErrorCallback,
  },
};
