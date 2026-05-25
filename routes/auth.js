const router = require('express').Router()

router.get('/login', (req, res) => {
    res.json({url:'/login'})
})


module.exports = router