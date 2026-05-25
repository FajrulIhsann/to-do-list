const router = require('express').Router()
const middleware = require('../../middlewares/auth.middleware')

router.get('/', (req, res) => {
    res.json({status:'success'})
})

router.use('/auth', require('./auth'))


module.exports = router