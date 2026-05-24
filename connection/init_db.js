const mysql = require('mysql2/promise')

const setDatabase = `CREATE DATABASE IF NOT EXISTS todo_list;`

async function initDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_HOST_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        
    })

    await connection.query(setDatabase)
    await console.log('Berhasil membuat database')

    await connection.end()
}

module.exports = initDatabase