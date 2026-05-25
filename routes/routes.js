const express = require('express')
const router = express.Router()

router.use(require('./auth'))
router.use('/home', require('./todos'))
router.use('/api', require('./api/api'))

router.get('/', (req, res) => {
    res.redirect('/home')
})


module.exports = router