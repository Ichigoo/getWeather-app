import 'dotenv/config';
import axios from 'axios';

const API_KEY = process.env.OPENWEATHER_API_KEY;

const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

const GEO_URL = 'http://api.openweathermap.org/geo/1.0/';

function handleApiError(error) {
  if (error.response) {
    const message = error.response.data.message || 'Unknown API issue';
    throw new Error(`API Error: ${message}`);
  }
  throw new Error(`Network Error: Failed to connect to the weather service.`);
}


// Fetch Single City Weather

export async function fetchWeatherByCity(locationName) {


  if (!API_KEY) {
    throw new Error("API Key is missing. Check your .env file.");
  }

  try {
    const url = `${BASE_URL}weather`;

    const response = await axios.get(url, {
      params: {
        q: locationName,
        appid: API_KEY,
        units: 'metric'
      }
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}


// Fetch country Weather

export async function fetchCitiesByCountry(countryName) {

  if (!API_KEY) {
    throw new Error("API Key is missing. Check your .env file.");
  }


  let lat, lon, countryCode;
  try {
    const geoResponse = await axios.get(`${GEO_URL}direct`, {
      params: {
        q: countryName,
        limit: 1,
        appid: API_KEY
      }
    });

    if (geoResponse.data.length === 0) {
      throw new Error('API Error: location not found');
    }

    ({
      lat,
      lon,
      country: countryCode
    } = geoResponse.data[0]);

  } catch (error) {
    handleApiError(error);
  }

  try {
    const url = `${BASE_URL}find`;

    const listResponse = await axios.get(url, {
      params: {
        bbox: `${bbox[0]},${bbox[1]},${bbox[2]},${bbox[3]},10`,
        appid: API_KEY,
        units: 'metric',
        cnt: 10
      }
    });

    const cityList = listResponse.data.list.filter(city => city.sys.country === countryCode);

    return cityList;

  } catch (error) {
    handleApiError(error);
  }
}