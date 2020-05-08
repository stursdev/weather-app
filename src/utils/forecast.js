const request = require('request')

// Forecast Function
const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=789584bc5272842389140fd88188902d&query=${latitude},${longitude}&units=f`

    request({ url: url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to weather services!', undefined)
        }else if(body.error){
            // Code breaks if no coordinates are provided ex. empty string
            callback('Unable to find location. Try different coordinates.', undefined)
        }else{
            const weather = `It's ${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out!`
            callback(undefined, weather )
        }
    })
}









module.exports = forecast