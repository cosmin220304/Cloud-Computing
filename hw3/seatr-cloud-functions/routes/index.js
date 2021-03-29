const reservationRouter = require('./reservation')
const restaurantRouter = require('./restaurant')
const userRouter = require('./user')
const authRouter = require('./auth')

const {Router} = require('express')

const router = Router()

router.use(reservationRouter)
router.use(restaurantRouter)
router.use(userRouter)
router.use(authRouter)

module.exports = router