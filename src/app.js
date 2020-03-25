const path = require('path');
const express = require('express');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js')

const hbs = require('hbs');
const app = express();

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// Setup handlbars and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath)
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));



app.get ('', (req, res) => {
    res.render('index', {
        title: 'Weather', 
        name: 'Laura Seal'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Laura Seal'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page', 
        msg: 'You need to fill in the portal',
        name: 'Laura Seal'
    })
});

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error: 'You need to provide a location'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

        if (error) {
            return res.send({error});
        };
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error});
            };
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            });
        });
    });    
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
         return res.send({
            error: 'you must provide a search term'
        })
    }

    console.log(req.query);
    res.send({
        products: []
    })
})
app.get('/help/*' , (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Help article not found',
        name: 'Laura Seal'
    })
})
// This has to come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        msg: 'Page not found',
        name: 'Laura Seal'
    })
})

app.listen(3000, () => {
    console.log('server is up in port 3000')
});