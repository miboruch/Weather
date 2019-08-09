/* This is the base JS file which will be boundle to public folder */
import '../scss/main.scss'; /* <- scss file */
import Search from './model/Search';
import Weather from './model/Weather';
import ui from './view/dom-view';
import searchView from './view/search-view';
import weatherView from './view/weather-view';

import { getAllCities, searchCity } from './model/Search';

let state = {
  /* result: */
  /* 
     Result value will be the result of every data fetch.
     Then we will be able to access those values from 
     every event listener.
   */
};

ui.home.addEventListener('click', function() {
  ui.closeMenu();
});

function getWeatherInfo(dataResult) {
  let weather = new Weather(dataResult);
  let cityInfo = weather.getPlaceInfo();
  let weatherHourly = weather.getHourlyWeather();
  state.result = weatherHourly;

  weatherView.setWeather(cityInfo, weatherHourly);
}

async function getWholeResult(cityName, cityCountry) {
  let citySearch = new Search(cityName, cityCountry);
  let result = await citySearch.getWeatherByCity();

  getWeatherInfo(result);

  searchView.clearInput();
  searchView.removeCities();
  searchView.removeErrorClass();

  weatherView.changeBackground();
  ui.closeMenu();
  ui.range.disabled = false;
}

/* Current location button controller */
ui.currentLocationButton.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition(async function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let currentCity = [lat, long];

    try {
      let search = new Search();
      let result = await search.getWeatherByLatLong(currentCity);

      getWeatherInfo(result);

      weatherView.changeBackground();

      ui.closeMenu();
      ui.range.disabled = false;
    } catch (e) {
      console.log(e);
    }
  });
});

/* Search button by city name controller */
ui.searchButton.addEventListener('click', async function() {
  try {
    let cityName = searchView.getValueFromInput();

    let allCities = await getAllCities(); /* Fetch list of all cities */
    let foundCity = searchCity(allCities, cityName); /* It can return more than 1 result */

    searchView.removeCities();

    /* Check if we have more than 1 city with typed name */
    if (foundCity.length !== 1) {
      foundCity.map(item => {
        searchView.renderCities(item); /* Render list with cities */
      });

      /* Get name and country of city and get the result */
      ui.resultCitiesList.addEventListener('click', function(e) {
        let finalCityName = e.target.parentNode.querySelector('.rendered-city-name').innerHTML;
        let finalCityCountry = e.target.parentNode.querySelector('.rendered-city-country').innerHTML;

        getWholeResult(finalCityName, finalCityCountry);
      });
    } else {
      let { name, country } = foundCity[0];
      console.log(name, country);

      getWholeResult(name, country);
    }
  } catch (e) {
    searchView.addErrorClass();
    searchView.removeCities();
    console.log(e);
  }
});

/* Range input controller */
ui.range.addEventListener('input', function() {
  weatherView.updateWeather(state.result, parseInt(this.value));
});
