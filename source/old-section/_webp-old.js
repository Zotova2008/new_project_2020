const imageData = {
  avif: 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=',
  webp: 'data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
};

// Функция проверки написана на основе документации Google:
// https://developers.google.com/speed/webp/faq#in_your_own_javascript

function checkImageFormatSupport(imageFormat, callback) {
  const img = new Image();

  img.src = imageData[imageFormat];

  img.onload = function () {
    const result = (img.width > 0) && (img.height > 0);
    callback(result);
  };
  img.onerror = function () {
    callback(false);
  };
}

// Проверяем поддержку WebP Lossy (сжатие с потерями)

checkImageFormatSupport('webp', (isWebpLossySupported) => {
  if (isWebpLossySupported) {
    document.documentElement.className = document.documentElement.className.replace('no-webplossy', 'webplossy');
  }
});

// Проверяем поддержку AVIF

checkImageFormatSupport('avif', (isAvifSupported) => {
  if (isAvifSupported) {
    document.documentElement.className = document.documentElement.className.replace('no-avif', 'avif');
  }
});
