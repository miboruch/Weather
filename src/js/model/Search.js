import axios from 'axios';

export default class Search {
  constructor(city, country) {
    this.city = city;
    this.country = country;
    this.key = '22fef29b733330cf033d5f024680e993';
  }

  async getWeatherByCity() {
    try {
      let result = await axios(
        `http://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.country}&APPID=${this.key}&units=metric`
      );

      return result.data;
    } catch (e) {
      throw new Error('City not found');
    }
  }

  async getWeatherByLatLong([lat, long]) {
    try {
      let result = await axios(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${this.key}&units=metric`);

      return result.data;
    } catch (e) {
      console.log(e);
    }
  }
}

/* Functions which cant be inside class */

async function getAllCities() {
  try {
    let data = await fetch('../city.list.json');
    let result = await data.json();

    return result;
  } catch (e) {
    console.log(e);
  }
}

function searchCity(cityName, allCities) {
  let cities = [];
  allCities.forEach(item => {
    if (item.name === cityName) {
      cities = [...cities, item];
    }
  });

  return cities.length === 0
    ? (function() {
        throw new Error('City not found');
      })()
    : cities;
}

export { getAllCities, searchCity };
