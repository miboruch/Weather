let ui = (function() {
  let hamburger = document.querySelector('.hamburger'),
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
    firstTemp = document.querySelector('.first-temp'),
    secondTemp = document.querySelector('.second-temp'),
    thirdTemp = document.querySelector('.third-temp'),
    fourthTemp = document.querySelector('.fourth-temp'),
    pressure = document.querySelector('.pressure'),
    humidity = document.querySelector('.humidity'),
    wind = document.querySelector('.wind'),
    firstHour = document.querySelector('.first-hour'),
    secondHour = document.querySelector('.second-hour'),
    thirdHour = document.querySelector('.third-hour'),
    fourthHour = document.querySelector('.fourth-hour');

  function closeMenu() {
    header.classList.remove('main-header--open');
    innerHamburger.classList.remove('inner-hamburger--open');
    cityForm.classList.remove('city-form--open');
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
    firstTemp: firstTemp,
    secondTemp: secondTemp,
    thirdTemp: thirdTemp,
    fourthTemp: fourthTemp,
    pressure: pressure,
    humidity: humidity,
    wind: wind,
    firstHour: firstHour,
    secondHour: secondHour,
    thirdHour: thirdHour,
    fourthHour: fourthHour,
  };
})();

export default ui;
