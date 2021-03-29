const {Datastore} = require('@google-cloud/datastore');
const { json } = require('express');
const datastore = new Datastore()

module.exports.getAllUsers = async(req,res)=>{
    try{
        res.status(200).json([])
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports.getUserById = async(req,res)=>{
    try{
        res.status(200).json({})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}


module.exports.createUser = async(req,res)=>{
    try{
        res.status(200).json({})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.updateUser = async(req,res)=>{
    try{
        res.status(200).json({})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports.removeUserById = async(req,res)=>{
    try{
        res.status(200).json({})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}