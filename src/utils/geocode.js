const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'http://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?limit=2&access_token=pk.eyJ1IjoicmFuMTIiLCJhIjoiY2t3ZHVsZW4zMWdocjJ2cWxpdndqZmQ0NCJ9._kjrxWwfWr0GYJraG1_P_Q'

    request({url, json: true}, (error, { body }) => {
        if(error){
           callback('Unable to connect to mapbox geocode location serives!' , undefined) 
        }else if (body.features.length === 0){
            callback('Unable to find location. please try another search!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode