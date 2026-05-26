const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({status:'success'})
})


router.use('/todos', require('./todos'))


module.exports = router