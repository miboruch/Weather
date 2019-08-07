import ui from './dom-view';

let weatherView = (function() {
  function roundValues(value) {
    return parseInt(value);
  }

  function calculateTime(weatherListTime) {
    let time = new Date(weatherListTime * 1000);
    let result = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return result;
  }

  function setCityInfo(placeInfo) {
    ui.city.innerHTML = placeInfo.name;
    ui.population.innerHTML = `Population: ${placeInfo.population}`;
    ui.country.innerHTML = placeInfo.country;
  }

  function setWeatherInfo(weatherList, offset = 0) {
    ui.temperature.innerHTML = `${roundValues(weatherList[0 + offset].main.temp)}<sup>o</sup>`;
    ui.weatherDescription.innerHTML = weatherList[0 + offset].weather[0].main;
    ui.firstTemp.innerHTML = ui.temperature.innerHTML;
    ui.secondTemp.innerHTML = `${roundValues(weatherList[1 + offset].main.temp)}<sup>o</sup>`;
    ui.thirdTemp.innerHTML = `${roundValues(weatherList[2 + offset].main.temp)}<sup>o</sup>`;
    ui.fourthTemp.innerHTML = `${roundValues(weatherList[3 + offset].main.temp)}<sup>o</sup>`;
    ui.pressure.innerHTML = `${roundValues(weatherList[0 + offset].main.pressure)} hPa`;
    ui.humidity.innerHTML = `${weatherList[0 + offset].main.humidity}%`;
    ui.wind.innerHTML = `${roundValues(weatherList[0 + offset].wind.speed)} m/s`;

    ui.firstHour.innerHTML = `${calculateTime(weatherList[0 + offset].dt)}`;
    ui.secondHour.innerHTML = `${calculateTime(weatherList[1 + offset].dt)}`;
    ui.thirdHour.innerHTML = `${calculateTime(weatherList[2 + offset].dt)}`;
    ui.fourthHour.innerHTML = `${calculateTime(weatherList[3 + offset].dt)}`;
  }

  function setWeather(cityInfo, weatherList, offset = 0) {
    setCityInfo(cityInfo);
    setWeatherInfo(weatherList, offset);
  }

  function updateWeather(weatherList) {
    setWeatherInfo(weatherList);
  }

  return {
    setWeather: setWeather,
    updateWeather: updateWeather,
  };
})();

export default weatherView;
