/* This is the base JS file which will be boundle to public folder */
import '../scss/main.scss'; /* <- scss file */
import ui from './view/dom-view';
import Search from './model/Search';
import searchView from './view/search-view';
import Page from './model/Page';

let page = new Page();

if (window.location.hash) {
  let name = window.location.hash.substring(1);
  if (name !== 'home' && name !== 'weather') {
    page.name = 'home';
    page.loadPage();
  } else {
    page.name = name;
    page.loadPage();
  }
}

ui.home.addEventListener('click', function() {
  page.name = 'home';
  page.loadPage();
  ui.closeMenu();
});

ui.currentLocationButton.addEventListener('click', function() {
  page.name = 'weather';
  page.loadPage();
  navigator.geolocation.getCurrentPosition(async function(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    let currentCity = [lat, long];
    console.log(currentCity);

    try {
      let search = new Search();
      let result = await search.getWeatherByLatLong(currentCity);
      console.log(result);
    } catch (e) {
      console.log(e);
    }
  });
});

ui.searchButton.addEventListener('click', async function() {
  page.name = 'weather';
  page.loadPage();
  try {
    let cityName = searchView.getValueFromInput();
    let citySearch = new Search(cityName);
    let result = await citySearch.getWeatherByCity();

    console.log(result);
    searchView.clearInput();

    ui.removeErrorClass();
    ui.closeMenu();
  } catch (e) {
    ui.addErrorClass();
    console.log(e);
  }
});
