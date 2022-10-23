const phoneInputs = document.querySelectorAll('.auth__form-field--imask');

const getInputNumbersValue = function (input) {
  // Return stripped input value — just numbers
  return input.value.replace(/\D/g, '');
};

const onPhonePaste = function (e) {
  const input = e.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const pasted = e.clipboardData || window.clipboardData;
  if (pasted) {
    const pastedText = pasted.getData('Text');
    if (/\D/g.test(pastedText)) {
      // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
      // formatting will be in onPhoneInput handler
      input.value = inputNumbersValue;
      // return;
    }
  }
};

const onPhoneInput = function (e) {
  const input = e.target;
  const inputNumbersValue = getInputNumbersValue(input);
  const selectionStart = input.selectionStart;
  let formattedInputValue = '';

  if (!inputNumbersValue) {
    // return input.value = '';
    input.value = '';
  }

  if (input.value.length !== selectionStart) {
    // Editing in the middle of input, not last symbol
    if (e.data && /\D/g.test(e.data)) {
      // Attempt to input non-numeric symbol
      input.value = inputNumbersValue;
    }
    return;
  }
  formattedInputValue = `+${inputNumbersValue.substring(0, 25)}`;
  input.value = formattedInputValue;
};

const onPhoneKeyDown = function (e) {
  // Clear input after remove last symbol
  const inputValue = e.target.value.replace(/\D/g, '');
  if (e.keyCode === 8 && inputValue.length === 1) {
    e.target.value = '';
  }
};

if (phoneInputs) {
  for (const phoneInput of phoneInputs) {
    phoneInput.addEventListener('keydown', onPhoneKeyDown);
    phoneInput.addEventListener('input', onPhoneInput, false);
    phoneInput.addEventListener('paste', onPhonePaste, false);
  }
}
