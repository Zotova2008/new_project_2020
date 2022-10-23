// Скрипт для модальных окон
if (document.querySelector('.js-open-modal') && document.querySelector('.js-overlay-modal')) {
  const modalButtons = document.querySelectorAll('.js-open-modal');
  const overlay = document.querySelector('.js-overlay-modal');
  const closeButtons = document.querySelectorAll('.js-modal-close');
  const body = document.querySelector('body');

  const openModal = function (elem) {
    elem.classList.add('modal--open');
    body.classList.add('no-scroll');
  };

  const closeModal = function (elem) {
    elem.classList.remove('modal--open');
    body.classList.remove('no-scroll');
  };

  modalButtons.forEach((item) => {
    item.addEventListener('click', function (e) {
      e.preventDefault();

      const modalId = this.getAttribute('data-id');
      const modalElem = document.querySelector(`.modal[data-id="${  modalId  }"]`);

      openModal(modalElem);
    });
  });


  closeButtons.forEach((item) => {
    item.addEventListener('click', function () {
      const parentModal = this.closest('.modal');
      closeModal(parentModal);
    });
  });

  document.body.addEventListener('keyup', (e) => {
    const key = e.keyCode;

    if (key === 27) {
      const modalActiv = document.querySelector('.modal--open');
      if (modalActiv) {
        closeModal(modalActiv);
      }
    }
  }, false);

  overlay.addEventListener('click', function () {
    const parentModal = this.closest('.modal');
    closeModal(parentModal);
  });
}
