const {Router} = require('express')
const {reservationController} = require('../controllers')
const {reservationValidator} = require('../schmas')

const router = Router()

router.get('/restaurant/:restaurantId/reservation',reservationController.getAllReservationsByRestaurantId)
router.post('/restaurant/:restaurantId/reservation',reservationValidator,reservationController.createReservation)
router.delete('/restaurant/:restaurantId/reservation/:reservationId',reservationController.removeReservationById)

module.exports = router