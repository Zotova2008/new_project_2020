import IMask from 'imask';
export const initMask = function () {

  var elements = document.querySelectorAll('input[type=tel]');
  var maskOptions = {
    mask: '+{7} (000) 000-00-00'
  };

  elements.forEach(function (item) {
    var item = IMask(item, maskOptions);
  });
}
