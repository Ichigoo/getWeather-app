import axios from 'axios';



const BASE_URL = 'https://api.openweathermap.org/data/2.5/';

function handleApiError(error) {
  if (error.response) {
    const message = error.response.data.message || 'Unknown API issue';
    throw new Error(`API Error: ${message}`);
  }
  throw new Error(`Network Error: Failed to connect to the weather service.`);
}

export async function fetchWeatherByCity(locationName, apiKey) {

  try {
    const url = `${BASE_URL}weather`;

    const response = await axios.get(url, {
      params: {
        q: locationName,
        appid: apiKey,
        units: 'metric'
      }
    });

    return response.data;
  } catch (error) {
    handleApiError(error);
  }
}