const {Datastore} = require('@google-cloud/datastore');
const datastore = new Datastore()

module.exports.getRestaurants = async (req,res)=>{
    const restaurantQuery = await datastore.createQuery('Restaurant').run()
    console.log(restaurantQuery)
    res.send('cox toni montana')
}