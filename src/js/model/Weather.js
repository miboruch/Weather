export default class Weather {
  constructor(weatherData) {
    this.weatherData = weatherData;
  }

  getHourWeather() {
    return this.weatherData.list;
  }

  getPlaceInfo() {
    return this.weatherData.city;
  }
}
