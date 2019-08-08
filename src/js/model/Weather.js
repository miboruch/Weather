export default class Weather {
  constructor(weatherData) {
    this.weatherData = weatherData;
  }

  getHourlyWeather() {
    return this.weatherData.list;
  }

  getPlaceInfo() {
    return this.weatherData.city;
  }
}
