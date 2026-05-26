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
        res.status(201).json({status: 'success'})
        console.table(result)
    }
}

module.exports = todosController