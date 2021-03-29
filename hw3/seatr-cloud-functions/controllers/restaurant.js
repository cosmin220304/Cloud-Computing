const {Datastore} = require('@google-cloud/datastore');
const { json } = require('express');
const datastore = new Datastore()

module.exports.getAllRestaurants = async (req,res)=>{
    try{
        const restaurants = await datastore.createQuery('Restaurant').run()
        res.status(200).json(restaurants)
    }
    catch(err){
        res.status(500).json(JSON.stringify({error:err.message}))
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
        res.status(200).json(JSON.stringify({restaurant}))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))

    }
}

module.exports.getRestaurantById= async(req,res)=>{
    try{
        res.status(200).json(JSON.stringify({}))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}

module.exports.updateRestaurantById = async(req,res)=>{
    try{
        res.status(200).json(JSON.stringify({}))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}
module.exports.removeRestaurantById = async(req,res)=>{
    try{
        res.status(200).json(JSON.stringify({}))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}