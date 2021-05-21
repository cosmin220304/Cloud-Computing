const reservationValidator = require('./reservation')
const restaurantValidator = require('./restaurant')
const registerValidator = require('./register')
const loginValidator = require('./login')

module.exports = {
    reservationValidator,
    restaurantValidator,
    loginValidator,
    registerValidator,
}