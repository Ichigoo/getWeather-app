import getWeatherInfo from '../Index.js';

async function testLocation(location) {
    console.log(`\n--- Testing Location: ${location} ---`);

    try {
        const data = await getWeatherInfo(location);

        console.log(`Success: Found weather for ${location}.`);
        console.log('Result:', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error(`Failure for ${location}: ${error.message}`);
    }
}

async function runSimpleTests() {

    await testLocation('Marrakech');
    await testLocation('France');
    await testLocation('ZZZ_Invalid_City_Name');
}

runSimpleTests();