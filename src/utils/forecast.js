const request = require('request');

const forecast = (lat, long, callback) => {
    const url = 'https://api.darksky.net/forecast/526d855135f94ac982bb89c052b5d71b/' + lat +',' + long + '?units=si';

    request({url, json: true}, (error, {body}) => {

        if(error){
            callback("You currently don't have access to the weather service", undefined)
        } else if(body.error) {
            callback('unable to find location', undefined)
        } else {
            const temp = body.currently.temperature;
            const humidity = body.currently.humidity;
            const rain = body.currently.precipProbability;
            callback(undefined, body.daily.data[0].summary + ` It is currently ${temp} degrees out. There is a ${rain}% chance of rain. The humidity is ${humidity}%`)
        }  
    })
}

module.exports = forecast;