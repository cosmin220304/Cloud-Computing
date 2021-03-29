const {Datastore} = require('@google-cloud/datastore');
const { json } = require('express');
const datastore = new Datastore()

module.exports.getAllReservations = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify([]))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}

module.exports.getAllReservationsByRestaurantId = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify([]))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}

module.exports.getReservationById= async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}

module.exports.createReservation = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}

module.exports.removeReservationById = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}