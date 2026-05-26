const router = require('express').Router()
const todosController = require('../controller/controller-todos')
const middlewares = require('../middlewares/auth.middleware')

// router.use('/', middlewares.authOnly)

router.get('/', middlewares.authOnly ,(req, res) => {
    res.render('home')
})



module.exports = router