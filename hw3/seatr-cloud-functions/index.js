const express = require('express')
const router = require('./routes')

// Create an Express object and routes (in order)
const app = express() 
app.use(router)
app.use((req,res)=>{
    res.status(404).send(JSON.stringify({message:'not found'}))
});

// Set our GCF handler to our Express app.
module.exports.restaurants = app
