// Меню

const menuBtn = document.querySelector('.nav__toggle');
const header = document.querySelector('.header');
const headerNav = document.querySelector('.header__nav');
const menuLink = document.querySelectorAll('.nav-menu__link--anchor');

const onMenuOpened = () => {
  header.classList.add('header--open');
  document.body.classList.add('no-scroll');
};

const onMenuClosed = () => {
  header.classList.remove('header--open');
  document.body.classList.remove('no-scroll');
};

const onMenuEsc = (evt) => {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    header.classList.remove('header--open');
    document.body.classList.remove('no-scroll');
  }
};

if (menuBtn) {
  menuBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (header.classList.contains('header--open')) {
      onMenuClosed();
      document.removeEventListener('keydown', onMenuEsc);
    } else {
      onMenuOpened();
      document.addEventListener('keydown', onMenuEsc);
    }
  });

  headerNav.addEventListener('click', (evt) => {
    evt.preventDefault();
    let target = evt.target;
    if (target === headerNav) {
      if (header.classList.contains('header--open')) {
        onMenuClosed();
      }
    }
  });
}

// const menuBtn = document.querySelector('.nav__toggle');
// const menuNav = document.querySelector('.nav');
// // const menuLink = document.querySelectorAll('.nav__link');
// const anchorScroll = document.querySelectorAll('.nav .js-anchor-scroll');

// if (menuBtn) {
//   menuBtn.addEventListener('click', (evt) => {
//     evt.preventDefault();
//     document.body.classList.toggle('no-scroll');
//     menuNav.classList.toggle('nav--open');
//   });

//   anchorScroll.forEach((item) => {
//     item.addEventListener('click', (e) => {
//       e.preventDefault();
//       menuNav.classList.remove('nav--open');
//       document.body.classList.remove('no-scroll');
//     });
//   });
// }



