const {restaurantController} = require('../controllers')
const {Router} = require('express')
const {restaurantValidator} = require('../schmas')

const router =  Router()

router.get('/restaurant',restaurantController.getAllRestaurants)
router.get('/restaurant/:restaurantId',restaurantController.getRestaurantById)
router.post('/restaurant',restaurantValidator, restaurantController.createRestaurant)
router.put('/restaurant/:restaurantId',restaurantValidator,restaurantController.updateRestaurantById)
router.delete('/restaurant/:restaurantId',restaurantController.removeRestaurantById)

module.exports = router