const mysql = require('mysql2/promise')

const setDatabase = `CREATE DATABASE IF NOT EXISTS todo_list;`
const initAkun = `
CREATE TABLE IF NOT EXISTS akun (
id INT AUTO_INCREMENT PRIMARY KEY,
nama VARCHAR(100) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);
`
const initTasks = `
CREATE TABLE IF NOT EXISTS tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT NOT NULL,
task VARCHAR(100) NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP()
);
`

async function initDatabase() {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        // Uncomment the line below if you need to configure the port
        port: process.env.DB_HOST_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        
    })

    await connection.query(setDatabase)
    await connection.query('USE todo_list;')
    await connection.query(initAkun)
    await connection.query(initTasks)
    await console.log('Berhasil membuat database')

    await connection.end()
}

module.exports = initDatabase
