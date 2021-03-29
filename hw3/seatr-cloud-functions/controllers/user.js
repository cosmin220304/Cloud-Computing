const {Datastore} = require('@google-cloud/datastore');
const { json } = require('express');
const datastore = new Datastore()

module.exports.getAllUsers = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify([]))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}


module.exports.getUserById = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}


module.exports.createUser = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}

module.exports.updateUser = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}

module.exports.removeUserById = async(req,res)=>{
    try{
        res.status(200).send(JSON.stringify({}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}