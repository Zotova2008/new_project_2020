// Код для переполнения

const text = function () {
  function getTextNodesIn(elem, opt_fnFilter) {
    var textNodes = [];
    if (elem) {
      for (var nodes = elem.childNodes, i = nodes.length; i--;) {
        var node = nodes[i],
          nodeType = node.nodeType;
        if (nodeType == 3) {
          if (!opt_fnFilter || opt_fnFilter(node, elem)) {
            if (node.data.trim() !== '') {
              textNodes.push(node.data.trim() !== '' ? node : '');

            }
          }
        } else if (nodeType == 1 || nodeType == 9 || nodeType == 11) {
          textNodes = textNodes.concat(getTextNodesIn(node, opt_fnFilter));
        }
      }
    }
    return textNodes;
  }
  getTextNodesIn(document.body).forEach((item) => { item.textContent = "У меня есть несколько клиентов, которые записались ко мне на стрижку, не успев даже зайти в салон." })
};

// Кнопки и Ссылки
const btn = function () {
  const b = document.querySelectorAll('button');
  b.forEach(element => console.log(element));
};

const link = function () {
  const l = document.querySelectorAll('a');
  l.forEach(element => console.log(element));
}


// Картинки и Svg
const img = function () {
  const i = document.querySelectorAll('img');
  i.forEach(element => console.log(element));
}

const svg = function () {
  const s = document.querySelectorAll('svg');
  s.forEach(element => console.log(element));
}

// Form
const form = function () {
  const f = document.querySelectorAll('form');
  f.forEach(element => console.log(element));
}

// visually
const vis = function () {
  const v = document.querySelectorAll('.visually-hidden');
  v.forEach(element => console.log(element));
}

// Input
const input = function () {
  const inputs = document.querySelectorAll('input');
  let i = 1;
  inputs.forEach((item) => {
    console.log(i);
    console.log(item);
    const idItem = item.getAttribute('id');

    const requiredItem = item.getAttribute('required');
    if (requiredItem !== null) {
      console.log('Атрибут required есть');
    } else {
      console.log('Атрибута required нет');
    }

    if (item.parentNode.tagName === 'LABEL') {
      console.log(item.parentNode);
    } else {
      if (idItem !== null) {
        const label = document.querySelector(`label[for="${idItem}"]`);
        if (label) {
          console.log(label);
        } else {
          console.log(`Элемент с id${idItem}не найдено`);
        }
      } else {
        console.log('Элемент не имеет id');
      }
    }
    i++;
  });
}
