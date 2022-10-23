async function supportAVIF() { //https://github.com/leechy/imgsupport/blob/master/imgsupport.js
  const AVIF = new Image();
  await (AVIF.onload = AVIF.onerror = function () {
    if (AVIF.height === 2) {
      window.detectAvif = true;
      document.body.classList.add('avif');
      return true;
    } else {
      // document.body.classList.add('noavif');
      document.body.classList.remove('avif');
      return false;
    }
  });
  await (AVIF.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=');
}
supportAVIF();
async function supportWEBP() {
  const WEBP = new Image();
  await (WEBP.onload = WEBP.onerror = function () {
    if (WEBP.height === 2) {
      window.detectWebp = true;
      document.body.classList.add('webp');
      return true;
    } else {
      // document.body.classList.add('nowebp');
      document.body.classList.remove('webp');
      return false;
    }
  });
  await (WEBP.src = 'data:image/webp;base64,UklGRi4AAABXRUJQVlA4ICIAAABQAQCdASoDAAIAAgA2JQBOgC6gAP73M8eLuxHGTv3eIAAA');
}
supportWEBP();
