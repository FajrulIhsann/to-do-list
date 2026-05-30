const todosModel = require('../models/todosModel')
const errorHandler = require('../service/errorHandler')

const todosController = {
    getTasks : async (req, res) => {
        const user = req.session.user
        try{
            const result = await todosModel.get(user.id)
            return res.json({payload: result, status: 'success'})
        }catch(err){
            return errorHandler.internalServerError
        }
    },

    createTask : async (req, res) => {
        const userId = req.session.user.id
        const {task} = req.body
        const result = await todosModel.create(userId, task) 
        return res.status(201).json({status: 'success'})
        
    },

    deleteTask : async (req, res) => {
        const taskId = req.params.taskId
        
        const result = await todosModel.delete(taskId) 
        return res.status(201).json({payload : result , status:'deleted'})
        
    },

    doneTask : async (req, res) => {
        const taskId = req.params.taskId
        const {is_completed} = req.body
        const {status} = await todosModel.done(taskId, is_completed)
        
        return res.status(201).json({taskId: taskId, status: 'done!'})
    }
}

module.exports = todosController