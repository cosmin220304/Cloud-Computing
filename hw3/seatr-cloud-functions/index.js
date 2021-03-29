const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore()
module.exports.getRestaurants = async (req,res)=>{
    const restaurantQuery = await datastore.createQuery('Restaurant').run()
    console.log(restaurantQuery)
    res.send('cox toni montana')
}

module.exports.insertRestaurant = async (req,res)=>{
    try{
        const restaurantKey =  datastore.key('Restaurant')
        const restaurant={
            key:restaurantKey,
            data:{
                name:'restaurant fita',
                address:{},
                phoneNumber:'07NoiDoi'
            }
        }
        await datastore.save(restaurant)
        res.status(200).send(JSON.stringify({restaurant}))
    }
    catch(err){
        res.status(500).send(JSON.stringify({message:err.message}))

    }
}