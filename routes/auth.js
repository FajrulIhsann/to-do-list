const router = require('express').Router()
const middlewares = require('../middlewares/auth.middleware')
const authController = require('../controller/controller-auth')

router.get('/login', middlewares.guestOnly,(req, res) => {
    res.render('login-page', {errorMessage: null})
})
router.post('/login',  authController.login)

router.get('/register', (req, res) => {
    res.render('register-page', {errorMessage: null})
})
router.post('/register', authController.createAccount, middlewares.guestOnly)

router.get('/logout', authController.logout)

module.exports = router