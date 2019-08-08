/* This is the base JS file which will be boundle to public folder */
import '../scss/main.scss'; /* <- scss file */
import Search from './model/Search';
import Weather from './model/Weather';
import ui from './view/dom-view';
import searchView from './view/search-view';
import weatherView from './view/weather-view';

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

ui.searchButton.addEventListener('click', async function() {
  try {
    let cityName = searchView.getValueFromInput();
    let citySearch = new Search(cityName);
    let result = await citySearch.getWeatherByCity();

    getWeatherInfo(result);

    searchView.clearInput();
    searchView.removeErrorClass();

    weatherView.changeBackground();
    ui.closeMenu();
    ui.range.disabled = false;
  } catch (e) {
    searchView.addErrorClass();
    console.log(e);
  }
});

ui.range.addEventListener('input', function() {
  weatherView.updateWeather(state.result, parseInt(this.value));
});
