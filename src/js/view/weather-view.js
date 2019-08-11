import ui from './dom-view';

let weatherView = (function() {
  function roundValues(value) {
    return parseInt(value);
  }

  function getForecastTime(timezone, dateTxt) {
    let cityTimezone = timezone / 3600; /* city timezone from API is returned in miliseconds */
    let date = new Date(dateTxt);
    let currentTimezone = date.getTimezoneOffset() / 60; /* current timezone is returned in minutes */
    date.setHours(date.getHours() + (cityTimezone + currentTimezone));

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function getCurrentTime(cityResult) {
    let cityTimezone = cityResult.timezone / 3600; /* city timezone from API is returned in miliseconds */
    let date = new Date();
    let currentTimezone = date.getTimezoneOffset() / 60; /* current timezone is returned in minutes */
    date.setHours(date.getHours() + (cityTimezone + currentTimezone));

    ui.weekDay.innerHTML = ui.days[date.getDay()]; /* Day of week is set by the current time in any location */

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  function setCityInfo(placeInfo) {
    ui.city.innerHTML = placeInfo.name;
    ui.population.innerHTML = `Population: ${placeInfo.population}`;
    ui.country.innerHTML = placeInfo.country;
    ui.time.innerHTML = `${getCurrentTime(placeInfo)}`;
  }

  function setWeatherInfo(placeInfo, weatherList, offset = 0) {
    ui.temperature.innerHTML = `${roundValues(weatherList[0 + offset].main.temp)}<sup>o</sup>`;
    ui.weatherDescription.innerHTML = weatherList[0 + offset].weather[0].main;

    let counter = 0;
    ui.tempArray.map(item => {
      item.innerHTML = `${roundValues(weatherList[counter + offset].main.temp)}<sup>o</sup>`;
      counter++;
    });

    ui.pressure.innerHTML = `${roundValues(weatherList[0 + offset].main.pressure)} hPa`;
    ui.humidity.innerHTML = `${weatherList[0 + offset].main.humidity}%`;
    ui.wind.innerHTML = `${roundValues(weatherList[0 + offset].wind.speed)} m/s`;

    counter = 0;
    ui.hourArray.map(item => {
      item.innerHTML = `${getForecastTime(placeInfo.timezone, weatherList[counter + offset].dt_txt)}`;
      counter++;
    });

    counter = 0;
    ui.iconArray.map(item => {
      let weatherDesc = weatherList[counter + offset].weather[0].main;
      switch (weatherDesc) {
        case 'Clouds':
          item.src = './assets/clouds.svg';
          break;
        case 'Rain':
          item.style.animation = 'icon-animation .5s ease';
          item.src = './assets/rain.svg';
          break;
        case 'Snow':
          item.src = './assets/snow.svg';
          break;
        case 'Clear':
          item.style.animation = 'icon-animation .5s ease';
          item.src = './assets/sun.svg';
          break;
        case 'Thunderstorm':
          item.src = './assets/thunder.svg';
          break;
        default:
          item.src = './assets/clouds.svg';
      }
      counter++;
    });
  }

  function setWeatherAll(cityInfo, weatherList, offset = 0) {
    setCityInfo(cityInfo);
    setWeatherInfo(cityInfo, weatherList, offset);
  }

  function setBackground(url) {
    ui.wrapper.style.background = `url(${url})`;
    ui.wrapper.style.backgroundPosition = 'center';
    ui.wrapper.style.backgroundSize = 'cover';
  }

  function changeBackground() {
    let weatherDesc = ui.weatherDescription.innerHTML;
    let time = parseInt(ui.time.innerHTML.substring(0, 2));

    if (time >= 23 || time <= 5) {
      setBackground('../assets/night.jpg');
    } else {
      switch (weatherDesc) {
        case 'Rain':
          setBackground('../assets/rain.jpg');
          break;
        case 'Clouds':
          setBackground('../assets/clouds.jpg');
          break;
        case 'Snow':
          setBackground('../assets/snow.jpg');
          break;
        case 'Clear':
          setBackground('../assets/clear.jpg');
          break;
        default:
          setBackground('../assets/background.jpg');
      }
    }
  }

  return {
    setWeatherToDOM: setWeatherAll,
    updateWeather: setWeatherInfo,
    changeBackground: changeBackground,
  };
})();

export default weatherView;
