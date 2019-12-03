import ui from './dom-view';

let weatherView = (function() {
  function getForecastTime(timezone, dateTxt) {
    const cityTimezone = timezone / 3600; /* city timezone from API is returned in miliseconds */
    const date = new Date(dateTxt.replace(/\s/, 'T')); /* Convert date -SAFARI- */
    const currentTimezone = date.getTimezoneOffset() / 60; /* current timezone is returned in minutes */
    date.setHours(date.getHours() + (cityTimezone + currentTimezone));

    return [date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), ui.days[date.getDay()]];
    /* Returns array, first value is a time in format 14:00 and so on. Second value is a day of week which will be set to the current
       day of week on range input change */
  }

  function getCurrentTime(cityResult) {
    const cityTimezone = cityResult.timezone / 3600; /* city timezone from API is returned in miliseconds */
    const date = new Date();
    const currentTimezone = date.getTimezoneOffset() / 60; /* current timezone is returned in minutes */
    date.setHours(date.getHours() + (cityTimezone + currentTimezone));

    ui.weekDay.innerHTML = ui.days[date.getDay()]; /* Day of week is set by the current time in any location */

    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function setCityInfo(placeInfo) {
    ui.city.innerHTML = placeInfo.name;
    ui.population.innerHTML = `Population: ${placeInfo.population}`;
    ui.country.innerHTML = placeInfo.country;
    ui.time.innerHTML = `${getCurrentTime(placeInfo)}`;
  }

  function setWeatherInfo(placeInfo, weatherList, offset = 0) {
    ui.temperature.innerHTML = `${parseInt(weatherList[0 + offset].main.temp)}<sup>o</sup>`;
    ui.weatherDescription.innerHTML = weatherList[0 + offset].weather[0].main;

    ui.pressure.innerHTML = `${parseInt(weatherList[0 + offset].main.pressure)} hPa`;
    ui.humidity.innerHTML = `${weatherList[0 + offset].main.humidity}%`;
    ui.wind.innerHTML = `${parseInt(weatherList[0 + offset].wind.speed)} m/s`;

    ui.tempArray.forEach((item, index) => {
      item.innerHTML = `${parseInt(weatherList[index + offset].main.temp)}<sup>o</sup>`;
    });

    ui.hourArray.forEach((item, index) => {
      item.innerHTML = `${getForecastTime(placeInfo.timezone, weatherList[index + offset].dt_txt)[0]}`;
    });

    ui.dayOfWeek.forEach((item, index) => {
      item.innerHTML = `${getForecastTime(placeInfo.timezone, weatherList[index + offset].dt_txt)[1]}`;
    });

    ui.weekDay.innerHTML = ui.dayOfWeek[0].innerHTML;

    ui.iconArray.forEach((element, index) => {
      const iconList = ['moon.svg', 'Clouds.svg', 'Rain.svg', 'Snow.svg', 'Clear.svg', 'Thunderstorm.svg'];
      const possibleWeatherCases = ['Clouds', 'Rain', 'Snow', 'Clear', 'Thunderstorm'];

      const weatherDesc = weatherList[index + offset].weather[0].main;
      const time = parseInt(ui.hourArray[index].innerHTML.substring(0, 2));

      if (time >= 23 || time <= 5) {
        element.src = './assets/moon.svg';
      } else {
        possibleWeatherCases.map(item => {
          switch (weatherDesc) {
            case item:
              element.src = `./assets/${iconList.filter(el => el.includes(item))}`;
              break;
          }
        });
      }
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
    const backgroundList = ['Clouds.jpg', 'Rain.jpg', 'Snow.jpg', 'Clear.jpg'];
    const possibleWeatherCases = ['Clouds', 'Rain', 'Snow', 'Clear'];

    const weatherDesc = ui.weatherDescription.innerHTML;
    const time = parseInt(ui.time.innerHTML.substring(0, 2));

    if (time >= 23 || time <= 5) {
      setBackground('../assets/night.jpg');
    } else {
      possibleWeatherCases.map(item => {
        switch (weatherDesc) {
          case item:
            setBackground(`../assets/${backgroundList.filter(el => el.includes(item))}`);
        }
      });
    }
  }

  function setTimeOnRangeChange(placeInfo, value) {
    value >= 0 && value < 1 ? (ui.time.innerHTML = `${getCurrentTime(placeInfo)}`) : (ui.time.innerHTML = ui.hourArray[0].innerHTML);
  }

  return {
    setWeatherToDOM: setWeatherAll,
    updateWeather: setWeatherInfo,
    changeBackground: changeBackground,
    setTimeOnRangeChange: setTimeOnRangeChange,
  };
})();

export default weatherView;
