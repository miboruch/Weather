export default class Page {
  constructor(name = 'home') {
    this.name = name;
  }

  loadPage() {
    let url = `${this.name}.html`,
      pageBox = document.querySelector('.place');

    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
      if (xhr.status === 200 && xhr.readyState === 4) {
        pageBox.innerHTML = xhr.responseText;
        console.log(xhr.status);

        window.history.pushState(null, null, `#${url}`);
      }
    };

    xhr.open('GET', `./subsites/${url}`, true);
    xhr.setRequestHeader('Content-Type', 'text/html');
    xhr.send();
  }
}
