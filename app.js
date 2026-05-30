require('dotenv').config()

const express = require('express')
const app = express()
const port = process.env.APP_PORT
const routes = require('./routes')

const db = require('./connection/database')
const initDatabase = require('./connection/init_db')
const sessionMiddleware = require('./config/session')

const errorRoutes = require('./routes/errorHandler')

async function startServer(){
    await initDatabase()
    app.set('view engine', 'ejs')
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(sessionMiddleware)

    
    
    app.use('/', routes)
    app.use(errorRoutes)
    
    app.listen(port, () => {
        console.log('App sudah aktif di localhost:', port)
    })
}

startServer().catch((err) => {
    console.error('Server gagal dimulai: ', err)
})