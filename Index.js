import {
    fetchWeatherByCity,
    fetchCitiesByCountry
} from './lib/Weather-check.js';
import {
    parseWeatherData,
    parseCityList
} from './lib/data-parser.js';


async function getWeatherInfo(input) {
    if (!input || typeof input !== 'string' || input.trim() === '') {
        throw new Error("Input must be a non-empty string (City or Country name).");
    }

    const location = input.trim();

    // Try City First 
    try {
        const rawData = await fetchWeatherByCity(location);

        console.log("after fetch")

        const cleanData = parseWeatherData(rawData);

        console.log(`Successfully retrieved weather for city: ${cleanData.location.city}`);
        return cleanData;

    } catch (error) {

        console.log("catch fetch")

        // If OpenWeatherMap returns "city not found" for invalid city names
        if (error.message.includes('city not found')) {

            console.log(`City "${location}" not found. Attempting country search...`);
            // Try Country if City failed 
            try {
                const rawCityList = await fetchCitiesByCountry(location);
                const cleanCityList = parseCityList(rawCityList);

                if (cleanCityList.length === 0) {
                    throw new Error(`Country "${location}" found, but no major cities were returned.`);
                }

                console.log(`Successfully retrieved ${cleanCityList.length} cities for country: ${location}`);
                return cleanCityList;

            } catch (countryError) {
                throw new Error(`Location not found: Could not find city or country "${location}".`);
            }
        } else {
            throw error;
        }
    }
}

export default getWeatherInfo;