const { Datastore } = require('@google-cloud/datastore')
const { json } = require('express')
const { v4: uuidv4 } = require('uuid')
const datastore = new Datastore()

module.exports.login = async (req,res)=>{
    try {
        const users = await datastore.createQuery('User').run()
        const user = users.filter(u => u.id === req.params.id)
        res.status(200).send(user)
    }
    catch(err){
        res.status(500).send(JSON.stringify({error:err.message}))
    }
}

module.exports.register = async (req,res)=>{
    try {
        const userKey = datastore.key('User')
        console.log(req.body)
        const newUser= {
            key: userKey,
            data: {
              ...req.body,
              id: uuidv4(),
              codeCreationDate: Date.now(),
            }
        }
        const createdUser = await datastore.save(newUser)
        res.status(200).send(JSON.stringify({createdUser}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))
    }
}