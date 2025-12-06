import getWeatherInfo from '../Index.js';

async function testLocation(location) {
    console.log(`\n--- Testing Location: ${location} ---`);

    try {
        const data = await getWeatherInfo(location);

        if (Array.isArray(data)) {
            console.log(`Success: Found ${data.length} cities for COUNTRY: ${location}.`);
            console.log('Sample data (first city):', JSON.stringify(data[0], null, 2));
        } else {
            console.log(`Success: Found weather for ${location}.`);
            console.log('Result:', JSON.stringify(data, null, 2));
        }

    } catch (error) {
        console.error(`Failure for ${location}: ${error.message}`);
    }
}

async function runSimpleTests() {

    await testLocation('Marrakech');
    await testLocation('Morocco');
    await testLocation('ZZZ_Invalid_City_Name');
}

runSimpleTests();