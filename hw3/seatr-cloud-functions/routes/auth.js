const {authController} = require('../controllers')
const {Router} = require('express')
const {loginValidator, registerValidator} = require('../schmas')

const router =  Router()

router.post('/login', authController.login)
router.post('/register', authController.register)  
router.post('/sms', authController.generateAuthCode) 

module.exports = router