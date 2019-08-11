export default class Weather {
  constructor(weatherData) {
    this.weatherData = weatherData;
  }

  getPlaceInfo() {
    return this.weatherData.city;
  }

  getHourlyWeather() {
    return this.weatherData.list;
  }
}
