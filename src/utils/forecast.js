const request = require('request')
const forecast = (latitude, longitude, callback)=>{
    const url = 'https://api.darksky.net/forecast/1acfb1caa2e1b2f06457105eae9d5461/' + latitude + ',' + longitude + '?units=us&lang=ru'
    request({url, json: true}, (error, {body})=>{
        if(error)
        {
            callback('Unable to connect to web service',undefined)
        }
        else if(body.error){
            callback('invalid',undefined)
        }
        else{
            const currentTemp = body.currently.temperature
            const rainProbability = body.currently.precipProbability
            const lowTemprature = body.daily.data[0].temperatureLow
            const highTemprature = body.daily.data[0].temperatureHigh
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + currentTemp + ' degrees out.' +
            ' High temprature is ' + highTemprature + ', low temprature is ' + lowTemprature + ' There is ' + rainProbability + '% chance of rain.')
        }
    })
}
module.exports = forecast
