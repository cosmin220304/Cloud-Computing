const express = require('express')
const restaurantController = require('./controllers/restaurant')
const authController = require('./controllers/auth')

// Create an Express object and routes (in order)
const app = express()
app.get('/restaurant', restaurantController.getAllRestaurants)
app.post('/restaurant', restaurantController.createRestaurant)
app.post('/login', authController.login)
app.post('/register', authController.register)
app.use((req,res)=>{
    res.status(404).send(JSON.stringify({message:'not found'}))
});

// Set our GCF handler to our Express app.
module.exports.restaurants = app
