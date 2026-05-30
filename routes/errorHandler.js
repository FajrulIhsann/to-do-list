const router = require('express').Router()
const errorHandlerService = require('../service/errorHandler')

router.use(errorHandlerService.notFound)

module.exports = router