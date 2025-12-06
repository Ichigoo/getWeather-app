import {
    fetchWeatherByCity
} from './lib/Weather-check.js';
import {
    parseWeatherData
} from './lib/data-parser.js';
import 'dotenv/config';

const API_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeatherInfo(input) {
    if (!input || typeof input !== 'string' || input.trim() === '') {
        throw new Error("Input must be a non-empty string (City or Country name).");
    }
    if (!API_KEY) {
        throw new Error("API Key is missing. Check your .env file.");
    }
    const location = input.trim();

    // Try City 
    try {
        const rawData = await fetchWeatherByCity(location);

        console.log("after fetch")

        const cleanData = parseWeatherData(rawData);

        console.log(`Successfully retrieved weather for city: ${cleanData.location.city}`);
        return cleanData;

    } catch (error) {

        throw new Error(`Location not found: Could not find city or country "${location}".`);
    }
}

export default getWeatherInfo;