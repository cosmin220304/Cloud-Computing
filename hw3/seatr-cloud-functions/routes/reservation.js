const {Router} = require('express')
const {reservationController} = require('../controllers')

const router = Router()
router.get('/restaurant/:restaurantId/reservation',reservationController.getAllReservationsByRestaurantId)
router.post('/restaurant/:restaurantId/reservation',reservationController.createReservation)
router.delete('/restaurant/:restaurantId/reservation',reservationController.removeReservationById)

module.exports = router