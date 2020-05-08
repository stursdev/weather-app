const request = require('request')

// Geocoding Function
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic3R1cnNkZXYiLCJhIjoiY2s5bmJmMHd2MDBrNDNkb2I2bzkwNjE3OCJ9.5K8Fg4_IL_pfVh6270492g&limit=1'

    request({url, json:true}, (error, {body}) => {
        if (error){
            callback('Unable to connect to location services!', undefined)
        }else if(body.features.length === 0){
            callback('Unable to find location. Try another search.', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode
