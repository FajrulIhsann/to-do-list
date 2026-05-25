require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/routes')
const port = 3030
const db = require('./connection/database')
const session = require('express-session')
const initDatabase = require('./connection/init_db')

async function startServer(){
    await initDatabase()
    app.set('view engine', 'ejs')
    app.use(express.static('public'));
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())

    app.use(session({
    secret: 'kirana-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: true }
}   ))
    
    app.use('/', routes)
    
    app.listen(port, () => {
        console.log('App sudah aktif di localhost:', port)
    })
}

startServer().catch((err) => {
    console.error('Server gagal dimulai: ', err)
})