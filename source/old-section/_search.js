const searchLink = document.querySelector('.nav__search-link');
const searchContainer = document.querySelector('.nav__search-container');

if (searchLink) {
  searchLink.addEventListener('click', (item) => {
    item.preventDefault();
    searchContainer.classList.add('nav__search-container--open');
  });

  document.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
      searchContainer.classList.remove('nav__search-container--open');
    }
  });

}
