let ui = (function() {
  let wrapper = document.querySelector('.wrapper'),
    hamburger = document.querySelector('.hamburger'),
    innerHamburger = document.querySelector('.inner-hamburger'),
    header = document.querySelector('.main-header'),
    cityForm = document.querySelector('.city-form'),
    weatherListItem = document.querySelector('.weather'),
    currentLocationButton = document.querySelector('.current-location'),
    searchButton = document.querySelector('.search'),
    cityInput = document.querySelector('.city-input'),
    home = document.querySelector('.home'),
    weatherDescription = document.querySelector('.weather-description'),
    temperature = document.querySelector('.temperature'),
    weekDay = document.querySelector('.week-day'),
    city = document.querySelector('.city'),
    population = document.querySelector('.population'),
    country = document.querySelector('.country'),
    pressure = document.querySelector('.pressure'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind'),
    tempArray = document.querySelectorAll('.temp'),
    hourArray = document.querySelectorAll('.hour'),
    iconArray = document.querySelectorAll('.icon'),
    range = document.querySelector('.range'),
    time = document.querySelector('.time'),
    resultCities = document.querySelector('.result-cities'),
    info = document.querySelector('.info'),
    dayOfWeek = document.querySelectorAll('.day-of-week');

  let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function closeMenu() {
    header.classList.remove('main-header--open');
    innerHamburger.classList.remove('inner-hamburger--open');
    cityForm.classList.remove('city-form--open');
  }

  function unblockButton() {
    searchButton.disabled = false;
    searchButton.style.opacity = 1;
  }

  function hideMessage() {
    info.style.opacity = 0;
    info.style.visibility = 'hidden';
  }

  range.disabled = true;
  searchButton.disabled = true;
  searchButton.style.opacity = 0.5;

  hamburger.addEventListener('click', function() {
    header.classList.toggle('main-header--open');
    innerHamburger.classList.toggle('inner-hamburger--open');
  });

  weatherListItem.addEventListener('click', function() {
    cityForm.classList.toggle('city-form--open');
  });

  return {
    wrapper: wrapper,
    cityInput: cityInput,
    searchButton: searchButton,
    currentLocationButton: currentLocationButton,
    closeMenu: closeMenu,
    home: home,
    weatherDescription: weatherDescription,
    temperature: temperature,
    weekDay: weekDay,
    city: city,
    population: population,
    country: country,
    tempArray: tempArray,
    iconArray: iconArray,
    pressure: pressure,
    humidity: humidity,
    wind: wind,
    hourArray: hourArray,
    days: days,
    range: range,
    time: time,
    resultCitiesList: resultCities,
    dayOfWeek: dayOfWeek,
    unblockButton: unblockButton,
    hideMessage: hideMessage,
  };
})();

export default ui;
