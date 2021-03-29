const {Datastore} = require('@google-cloud/datastore');
const { json } = require('express');
const datastore = new Datastore()

module.exports.getAllReservations = async(req,res)=>{
    try{
        const reservations = await datastore.createQuery('Reservation').run()
        res.status(200).json(JSON.stringify(reservations))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}

module.exports.getAllReservationsByRestaurantId = async(req,res)=>{
    try{
        const restaurantId = req.path.restaurantId
        const reservations = await datastore.createQuery('Reservation').filter('restaurantId','=',restaurantId).run()
        res.status(200).json(JSON.stringify(reservations))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}

module.exports.getReservationById= async(req,res)=>{
    try{
        const reservationId = req.path.reservationId
        const reservations = await datastore.createQuery('Reservation').filter('restaurantId','=',restaurantId).run()
        res.status(200).json(JSON.stringify({}))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}

module.exports.createReservation = async(req,res)=>{
    try{
        const reservationKey = datastore.key('Reservation');
        const reservation = await datastore.insert({
            key:reservationKey,
            data:{
                ...req.body
            }
        })
        res.status(200).json(JSON.stringify(reservation))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}

module.exports.removeReservationById = async(req,res)=>{
    try{
        res.status(200).json(JSON.stringify({message:'not implemented yet'}))
    }
    catch(err){
        res.status(500).json(JSON.stringify({message:err.message}))
    }
}