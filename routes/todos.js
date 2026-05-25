const router = require('express').Router()
const middlewares = require('../middlewares/auth.middleware')

router.use(middlewares.authOnly)

router.get('/', (req, res) => {
    res.render('home')
})


module.exports = router