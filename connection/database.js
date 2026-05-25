const mysql = require('mysql2')

const db = mysql.createPool({
    host: process.env.DB_HOST,
    // Uncomment the line below if you need to configure the port
    // port: process.env.DB_HOST_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 10,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
})

db.getConnection((err, conn) => {
    console.log('Connecting...')
    if(err){
        console.error(`Koneksi gagal: ${err}`)
    }else{
        console.log('Database terkoneksi (via Pool)!')
        conn.release()
    }
})

module.exports = db
