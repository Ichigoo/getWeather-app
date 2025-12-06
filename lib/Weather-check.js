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