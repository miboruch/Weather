/* This is the base JS file which will be boundle to public folder */
import '../scss/main.scss'; /* <- scss file */
import Search from './model/Search';
import Weather from './model/Weather';
import ui from './view/dom-view';
import searchView from './view/search-view';
import weatherView from './view/weather-view';

ui.home.addEventListener('click', function() {
  ui.closeMenu();
});

ui.currentLocationButton.addEventListener('click', function() {
  navigator.geolocation.getCurrentPosition(async function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let currentCity = [lat, long];
    console.log(currentCity);

    try {
      let search = new Search();
      let result = await search.getWeatherByLatLong(currentCity);

      let weather = new Weather(result);
      let cityInfo = weather.getPlaceInfo();
      let weatherHourly = weather.getHourWeather();

      weatherView.setWeather(cityInfo, weatherHourly);
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

    let weather = new Weather(result);
    let cityInfo = weather.getPlaceInfo();
    let weatherHourly = weather.getHourWeather();

    weatherView.setWeather(cityInfo, weatherHourly);

    console.log(result);
    searchView.clearInput();

    searchView.removeErrorClass();
    ui.closeMenu();
  } catch (e) {
    searchView.addErrorClass();
    console.log(e);
  }
});
