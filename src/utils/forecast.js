const request = require("request")

const forecast = (latitude, longitude, callback) => {
    const url = "https://api.darksky.net/forecast/722c09ffd99fb7db2f89c0ab0548110a/" + latitude + "," + longitude
    request({url, json: true}, (error,{body}) => {
        if(error){
                    callback("unable to connect to location services!", undefined)
                } 
                else if(body.error){
                    callback("unable to find location. Try again.", undefined)
                } else{
                    callback(undefined, body.daily.data[0].icon + "." + body.daily.data[0].summary + " It is currently " + body.currently.temperature + " degrees out. There is " + body.currently.precipProbability + "% of rain. High Temperature: " + body.daily.data[0].apparentTemperatureHigh + " degrees. Low Temperature: " + body.daily.data[0].apparentTemperatureLow + "degrees."
                        
                    )
                }
    })
}

module.exports = forecast