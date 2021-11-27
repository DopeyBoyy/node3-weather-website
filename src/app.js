const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define path for express config
const publicDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Ran Tal'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Ran Tal'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'Ran Tal'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        console.log(req.query.address)

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
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
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search) 
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Ran Tal',
        errorMessage: 'Help article not found'
    })
})

// 404 must come last
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Ran Tal',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})