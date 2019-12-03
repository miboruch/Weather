import '../scss/main.scss';
import Search from './model/Search';
import Weather from './model/Weather';
import ui from './view/dom-view';
import searchView from './view/search-view';
import weatherView from './view/weather-view';

import { getAllCities, searchCity } from './model/Search';

let state = {
  result: null,
  cityInfo: null,
  allCities: null,
};

(async function() {
  state.allCities = await getAllCities(); /* Load data */

  await getWholeResult('Warsaw', 'PL'); /* Default city on page load */

  ui.unblockButton();
  ui.hideMessage();
})();

function getWeatherInfo(dataResult) {
  const weather = new Weather(dataResult);
  const cityInfo = weather.getPlaceInfo();
  const weatherHourly = weather.getHourlyWeather();
  state.result = weatherHourly;
  state.cityInfo = cityInfo;

  weatherView.setWeatherToDOM(cityInfo, weatherHourly);
}

async function getWholeResult(cityName, cityCountry) {
  const citySearch = new Search(cityName, cityCountry);
  const result = await citySearch.getWeatherByCity();

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
      const search = new Search();
      const result = await search.getWeatherByLatLong(currentCity);

      getWeatherInfo(result);

      weatherView.changeBackground();
      ui.range.value = 0;

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
    const cityName = searchView.getValueFromInput();

    const foundCity = searchCity(cityName, state.allCities); /* It can return more than 1 result */

    searchView.removeCities();
    ui.range.value = 0;

    /* Check if we have more than 1 city with typed name */
    if (foundCity.length !== 1) {
      foundCity.map(item => {
        searchView.renderCities(item); /* Render list with cities */
      });

      /* Get name and country of clicked city and get the result */
      ui.resultCitiesList.addEventListener('click', function(e) {
        const finalCityName = e.target.parentNode.querySelector('.rendered-city-name').innerHTML;
        const finalCityCountry = e.target.parentNode.querySelector('.rendered-city-country').innerHTML;

        getWholeResult(finalCityName, finalCityCountry);
      });
    } else {
      const { name, country } = foundCity[0];

      await getWholeResult(name, country);
    }
  } catch (e) {
    searchView.addErrorClass();
    searchView.removeCities();
  }
});

/* Range input controller */
ui.range.addEventListener('input', function() {
  weatherView.updateWeather(state.cityInfo, state.result, parseInt(this.value));
  weatherView.setTimeOnRangeChange(state.cityInfo, this.value);
});

/* Close menu on click */
ui.home.addEventListener('click', function() {
  ui.closeMenu();
});
