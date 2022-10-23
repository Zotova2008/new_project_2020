// Скролл к якорю
const anchors = document.querySelectorAll('.js-anchor-scroll');

if (anchors) {

  for (const anchor of anchors) {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const blockID = anchor.getAttribute('href');

      document.querySelector(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }
}
