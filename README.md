# getweather-app

A simple and lightweight Node.js library for fetching weather information by **city** or **country**.  
Environment variables (including your `API_KEY`) are loaded via **dotenv**, keeping your credentials secure.

---

## Features

- :white_sun_rain_cloud: Fetch weather data by **city** or **country**
- :closed_lock_with_key: Uses `dotenv` for environment variable management
- :zap: Minimal, easy-to-use API
- :package: Zero configuration required

---

## Installation

Run the following command in your project:

```bash
npm install getweather-app
```

Create a `.env` file in your project root and add:

```bash
OPENWEATHER_API_KEY=your_api_key_here
```

---

## Usage

Import the library and call it with either a city or country:

```javascript
import getWeatherInfo from "getweather-app";

async function run() {
  const result = await getWeatherInfo("Berlin");
  console.log(result);
}

run();
```

You may also pass a country name:

```javascript
await getWeatherInfo("Germany");
await getWeatherInfo("London");
```

---

## API

### `getWeatherInfo(input: string): Promise<any>`

Fetches weather data for the given input.

#### Parameters

| Name  | Type   | Description          |
| ----- | ------ | -------------------- |
| input | string | City or country name |

#### Returns

A `Promise` resolving with the weather data returned by the upstream API.

---

## Environment Variables

Ensure your project loads dotenv before using the library:

```javascript
import "dotenv/config";
```

or

```javascript
require("dotenv").config();
```

---

## Example Output

```json
{
  "type": "city",
  "location": {
    "city": "Marrakesh",
    "countryCode": "MA"
  },
  "weather": {
    "description": "clear sky",
    "iconCode": "01n"
  },
  "temperature": {
    "current": 16.04,
    "feelsLike": 14.64,
    "min": 16.04,
    "max": 16.04,
    "unit": "C"
  },
  "humidity": 36
}
```
