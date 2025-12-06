//Parser for a SINGLE CITY 
export function parseWeatherData(rawData) {
    if (!rawData || !rawData.main || !rawData.weather) {
        throw new Error("Invalid or incomplete data received for city weather.");
    }

    const {
        temp,
        feels_like,
        temp_min,
        temp_max,
        humidity
    } = rawData.main;
    const weatherDescription = rawData.weather[0].description;
    const weatherIcon = rawData.weather[0].icon;

    const cleanData = {
        type: 'city',
        location: {
            city: rawData.name,
            countryCode: rawData.sys.country,
        },
        weather: {
            description: weatherDescription,
            iconCode: weatherIcon,
        },
        temperature: {
            current: temp,
            feelsLike: feels_like,
            min: temp_min,
            max: temp_max,
            unit: 'C'
        },
        humidity: humidity,
    };

    return cleanData;
}


//Parser for a LIST OF CITIES
export function parseCityList(rawCityList) {
    if (!Array.isArray(rawCityList)) {
        throw new Error("Invalid input: Expected an array for city list parsing.");
    }

    return rawCityList?.map((cityData, key) => {
        try {
            // Re-use the existing single-city parser for consistency
            const cleanCity = parseWeatherData(cityData);
            cleanCity.type = 'city_in_list';
            return cleanCity;
        } catch (error) {
            console.error(`Skipping city key= ${key} due to incomplete data: ${cityData.name || 'Unknown City'}`);
            return null;
        }
    }).filter(city => city !== null);
}