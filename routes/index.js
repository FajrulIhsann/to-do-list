const express = require('express')
const router = express.Router()

router.use(require('./auth'))
router.use('/app', require('./todos'))
router.use('/api', require('./api'))

router.get('/', (req, res) => {
    res.redirect('/app')
})


module.exports = router