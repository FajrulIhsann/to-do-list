const router = require('express').Router()
const authController = require('../../controller/controller-auth')
const middlewares = require('../../middlewares/auth.middleware')

router.post('/login',  authController.login)
router.post('/register', authController.createAccount, middlewares.guestOnly)
router.get('/logout', authController.logout)

router.get('/show', authController.show, )

module.exports = router