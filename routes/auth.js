const router = require('express').Router()
const middlewares = require('../middlewares/auth.middleware')

router.get('/login', middlewares.guestOnly,(req, res) => {
    res.render('login-page')
})

router.get('/register', middlewares.guestOnly,(req, res) => {
    res.render('register')
})

module.exports = router