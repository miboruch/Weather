import axios from 'axios';

export default class Search {
  constructor(city, country) {
    this.city = city;
    this.country = country;
    this.key = '22fef29b733330cf033d5f024680e993';
  }

  async getWeatherByCity() {
    try {
      const result = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=${this.city},${this.country}&APPID=${this.key}&units=metric`
      );

      return result.data;
    } catch (e) {
      throw new Error('City not found');
    }
  }

  async getWeatherByLatLong([lat, long]) {
    try {
      const result = await axios(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${this.key}&units=metric`);

      return result.data;
    } catch (e) {
      throw new Error('You location is not available now');
    }
  }
}

/* Functions which cant be inside class */

async function getAllCities() {
  try {
    const result = await axios('../city.list.json');

    return result;
  } catch (e) {
    throw new Error('Error with loading all cities');
  }
}

function searchCity(cityName, allCities) {
  const cities = [];
  const { data } = allCities;

  data.forEach(item => {
    if (item.name === cityName) {
      cities.push(item);
    }
  });

  return cities.length === 0
    ? (function() {
        throw new Error('City not found');
      })()
    : cities;
}

export { getAllCities, searchCity };
