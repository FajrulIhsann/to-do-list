const router = require('express').Router()
const todosController = require('../../controller/controller-todos')
const middlewares = require('../../middlewares/auth.middleware')

router.use('/',middlewares.apiRequireAuth)

router.get('/', todosController.getTasks)
router.post('/', todosController.createTask)


module.exports = router