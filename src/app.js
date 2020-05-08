const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
// Heroku port
const port = process.env.PORT || 3000
// Define paths for express configuration
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars view locations
app.set('view engine', 'hbs' )
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory
app.use(express.static(publicDir))

// Express Routes
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Sam'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'About Page',
        name: 'Sam'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Help Page',
        name: 'Sam',
        helpMsg: 'This is a help message'
    })

})

// WeatherStack API end-point - provides JSON data for a location
app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'Address must be provided!'
        })
    } 
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{
        if (error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) =>{
            if (error){
                res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'Please provide search parameter'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 - ERROR',
        name: 'Sam',
        errorMsg: 'Help article is not found!'

    })
})
// Match undefined routes
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 - ERROR',
        name: 'Sam',
        errorMsg: 'Page Not Found!'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})