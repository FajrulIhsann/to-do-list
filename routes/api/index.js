const router = require('express').Router()

router.get('/', (req, res) => {
    res.json({message: 'hello!', status: "there's nothing here"})
})


router.use('/todos', require('./todos'))


module.exports = router