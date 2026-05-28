const todosModel = require('../models/todosModel')

const todosController = {
    getTasks : async (req, res) => {
        const user = req.session.user
        try{
            const result = await todosModel.get(user.id)
            return res.json({payload: result, status: 'success'})
        }catch(err){
            return res.status(500).json({payload : null,error: err})
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
        
    }
}

module.exports = todosController