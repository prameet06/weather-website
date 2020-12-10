const request = require('request');

const weatherstack = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=5185ad81a774c0ac4e061c1547ca0fd6&query=${encodeURIComponent(latitude)},${encodeURIComponent(longitude)}&units=m`;

    request({ url, json: true }, (error, { body }) => {

        if (error) {
            callback(`Unable to connect to location services`, undefined);
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                name: body.location.name,
                weather: body.current.weather_descriptions,
                temperature: body.current.temperature,
                feelslike: body.current.feelslike,
                humidity: body.current.humidity



            })
        }

    });
}
module.exports = weatherstack;