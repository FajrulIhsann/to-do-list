const router = require('express').Router()
const middleware = require('../../middlewares/auth.middleware')

router.get('/', (req, res) => {
    res.json({status:'success'})
})

router.get('/list', (req, res) => {
    res.json({
        MESSAGE: "OPO AE",
        list: {
            name: 'fajrul',
            age: 17
        },
        status: 'success'
    })
})



module.exports = router