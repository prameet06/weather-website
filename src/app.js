const express = require('express');
const path = require('path');
const hbs = require('hbs')
const request = require('request');
const geocode = require('./utils/geocode');
const weatherstack = require('./utils/weatherstack');
const app = express();
const port = process.env.PORT || 3000


//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public');

const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


//Setup handlebars engine and views location
//nodemon src/app.js -e js,hbs is used to provide extension so nodemon can reset when these files are changed
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    });
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'You must provide address'
        })
    } else {
        //data was destructured
        //default value is set to empty of destructured values so it dosent crash the server
        //and proceed to giving actual error instead which is in next line
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {

            if (error) {
                // return is used so if there is an error our function stops at if statement
                return res.send({
                    error: error
                })
            }
            //forecast data was destructured
            weatherstack(latitude, longitude, (error, { name, weather, temperature, feelslike }) => {

                if (error) {
                    return res.send({
                        error: error
                    })
                }

                res.send({
                    location: location,
                    name: name,
                    weather: weather,
                    temperature: temperature,
                    feelslike: feelslike



                })




            });
        });

    }

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    } else {
        res.send({
            products: []
        })
    }
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'This is a help page'
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        errorText: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        errorText: 'Error 404'
    })
})
app.listen(port, () => {

    console.log('Server is up on port' + port);
});