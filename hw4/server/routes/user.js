const {Router} = require('express')
const {userController} = require('../controllers')
const router = Router()

router.get('/user',userController.getAllUsers)
router.get('/user/:userId',userController.getUserById)
router.post('/user',userController.createUser)
router.put('/user',userController.updateUser)
router.delete('/user',userController.removeUserById)

module.exports = router