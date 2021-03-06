const request = require('postman-request')

const forecast =  (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=49747719978fda0b66a080e47756b474&query=' + longitude + ',' + latitude + "'"

    request( {url, json: true} , (error, {body}) => {
        if(error){
            callback('Unable to connect to weatherstack serive', undefined)
        } else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + " It's currently " + 
            body.current.temperature + " degrees out. It feels like " + 
            body.current.feelslike + " degrees out, the humidity is " + body.current.humidity)
        }
    })
}

module.exports = forecast