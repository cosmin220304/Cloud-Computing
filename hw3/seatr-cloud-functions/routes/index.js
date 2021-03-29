const reservationRouter = require('./reservation')
const restaurantRouter = require('./restaurant')
const userRouter = require('./user')

const {Router} = require('express')

const router = Router()

router.use(reservationRouter)
router.use(restaurantRouter)
router.use(userRouter)

module.exports = router