const session = require('express-session')
const MySQLStore = require('express-mysql-session')(session)

const storeOptions = {
    host: process.env.DB_HOST,
    port: process.env.DB_HOST_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
}

const sessionStore = new MySQLStore(storeOptions)

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    }
})

module.exports = sessionMiddleware