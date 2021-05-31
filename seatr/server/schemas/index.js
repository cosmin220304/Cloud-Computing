const reservationValidator = require('./reservation')
const restaurantValidator = require('./restaurant')
const registerValidator = require('./register')
const loginValidator = require('./login')
const userValidator = require('./user')

module.exports = {
    reservationValidator,
    restaurantValidator,
    loginValidator,
    registerValidator,
    userValidator,
}