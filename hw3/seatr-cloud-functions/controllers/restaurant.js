const {Datastore} = require('@google-cloud/datastore');
const { json } = require('express');
const datastore = new Datastore()

module.exports.getAllRestaurants = async (req,res)=>{
    try{
        const restaurants = await datastore.createQuery('Restaurant').run()
        res.status(200).send(restaurants)
    }
    catch(err){
        res.status(500).send(JSON.stringify({error:err.message}))
    }
}

module.exports.createRestaurant = async (req,res)=>{
    try{
        const restaurantKey =  datastore.key('Restaurant')
        const restaurant={
            key:restaurantKey,
            data:req.body
        }
        await datastore.save(restaurant)
        res.status(200).send(JSON.stringify({restaurant}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))

    }
}