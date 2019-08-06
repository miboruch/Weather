let ui = (function() {
  let hamburger = document.querySelector('.hamburger'),
    innerHamburger = document.querySelector('.inner-hamburger'),
    header = document.querySelector('.main-header'),
    cityForm = document.querySelector('.city-form'),
    weatherListItem = document.querySelector('.weather'),
    currentLocationButton = document.querySelector('.current-location'),
    searchButton = document.querySelector('.search'),
    cityInput = document.querySelector('.city-input'),
    home = document.querySelector('.home');

  function closeMenu() {
    header.classList.remove('main-header--open');
    innerHamburger.classList.remove('inner-hamburger--open');
    cityForm.classList.remove('city-form--open');
  }

  function addErrorClass() {
    cityInput.classList.add('city-input--error');
  }

  function removeErrorClass() {
    cityInput.classList.remove('city-input--error');
  }

  hamburger.addEventListener('click', function() {
    header.classList.toggle('main-header--open');
    innerHamburger.classList.toggle('inner-hamburger--open');
  });

  weatherListItem.addEventListener('click', function() {
    cityForm.classList.toggle('city-form--open');
  });

  return {
    cityInput: cityInput,
    addErrorClass: addErrorClass,
    removeErrorClass: removeErrorClass,
    searchButton: searchButton,
    currentLocationButton: currentLocationButton,
    closeMenu: closeMenu,
    home: home,
  };
})();

export default ui;
