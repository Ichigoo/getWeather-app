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