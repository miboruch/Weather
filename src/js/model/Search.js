import axios from 'axios';

export default class Search {
  constructor(city) {
    this.city = city;
    this.key = '22fef29b733330cf033d5f024680e993';
  }

  async getWeatherByCity() {
    try {
      let result = await axios(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.city},pl&APPID=${this.key}&units=metric`
      );

      return result.data;
    } catch (e) {
      throw new Error('City not found');
    }
  }

  async getWeatherByLatLong([lat, long]) {
    try {
      let result = await axios(
        `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${this.key}&units=metric`
      );

      return result.data;
    } catch (e) {
      console.log(e);
    }
  }
}
