import ui from './dom-view';

let searchView = (function() {
  function getValueFromInput() {
    return ui.cityInput.value;
  }

  function clearInput() {
    ui.cityInput.value = '';
  }

  function addErrorClass() {
    ui.cityInput.classList.add('city-input--error');
  }

  function removeErrorClass() {
    ui.cityInput.classList.remove('city-input--error');
  }

  function roundTo2(value) {
    return Math.round(value * 100) / 100;
  }

  function renderCities(city) {
    const markup = `
      <li>
        <p class='rendered-city-name'>${city.name}</p>
        <p class='rendered-city-country'>${city.country}</p>
        <p class='rendered-city-coords'>Lon: ${roundTo2(city.coord.lon)}, Lat: ${roundTo2(city.coord.lat)}</p>
      </li>
    `;
    ui.resultCitiesList.insertAdjacentHTML('beforeend', markup);
  }

  function removeCities() {
    ui.resultCitiesList.innerHTML = '';
  }

  return {
    clearInput: clearInput,
    getValueFromInput: getValueFromInput,
    addErrorClass: addErrorClass,
    removeErrorClass: removeErrorClass,
    renderCities: renderCities,
    removeCities: removeCities,
  };
})();

export default searchView;
