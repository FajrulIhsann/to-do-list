const db = require('../connection/database')

const todosModel = {
    get : async (userId) => {
        const sql = `SELECT * FROM tasks WHERE user_id = ?`
        const [todos] = await db.query(sql, [userId])
        return todos
    },

    create : async (userId, task) => {
        const sql = `INSERT INTO tasks (user_id, task) VALUES (?, ?)`
        const [result] = await db.query(sql, [userId, task])
        return result.insertId
    },

    delete: async (taskId) => {
        const sql = `DELETE FROM tasks WHERE id = ?`
        await db.query(sql, [taskId])
        return {taskId:taskId}
    },

    done: async (taskId, request) => {
        const sql = `UPDATE tasks SET is_completed = ? WHERE id = ?`
        if(request){
            await db.query(sql, [1, taskId])
            return {status: 'success'}
        }else if(!request){
            await db.query(sql, [0, taskId])
            return {status: 'success'}
        }

        return {status: 'error'}
    }

}

module.exports = todosModel