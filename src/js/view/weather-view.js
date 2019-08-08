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
    ui.time.innerHTML = `${calculateTime(weatherList[0 + offset].dt)}`;

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
      item.innerHTML = `${calculateTime(weatherList[counter + offset].dt)}`;
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

    let day = new Date(weatherList[0 + offset].dt * 1000);
    ui.weekDay.innerHTML = ui.days[day.getDay()];
  }

  function setWeatherAll(cityInfo, weatherList, offset = 0) {
    setCityInfo(cityInfo);
    setWeatherInfo(weatherList, offset);
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
    setWeather: setWeatherAll,
    updateWeather: setWeatherInfo,
    changeBackground: changeBackground,
  };
})();

export default weatherView;
