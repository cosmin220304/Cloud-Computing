const {restaurantController} = require('../controllers')
const {Router} = require('express')
const router =  Router()

router.get('/restaurant',restaurantController.getAllRestaurants)
router.get('/restaurant/:restaurantId',restaurantController.getRestaurantById)
router.post('/restaurant', restaurantController.createRestaurant)
router.put('/restaurant/:restaurantId',restaurantController.updateRestaurantById)
router.delete('/restaurant/:restaurantId',restaurantController.removeRestaurantById)

module.exports = router