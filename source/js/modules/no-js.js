'use scrict';

export const nojs = () => {
  if (document.querySelector('.no-js')) {
    document.querySelector('.no-js').classList.remove('no-js');
  }
}
