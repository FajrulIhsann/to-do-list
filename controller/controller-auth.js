const { hash } = require('bcrypt')
const authService = require('../service/authService')
const db = require = require('../connection/database')


async function createAccount(req, res) {
    const {username, password} = req.body

    const hashedPassword = await authService.hashPassword(password)

    const sql = `INSERT INTO akun (nama, password) VALUES (?, ?)`
    
    try{
       await db.query(sql, [username, hashedPassword])
        console.log(req.session.user)
        res.redirect('/login')
    }catch (err){
        if(err.code === 'ER_DUP_ENTRY'){
            return res.render('register-page', {errorMessage:'Username sudah digunakan!'})
        }
    }
}

async function login(req, res){
    try{
        const {username, password} = req.body
        const sql = `SELECT * FROM akun WHERE nama= ?`
        const [result] = await db.query(sql, [username])
        
        const akun = result[0]
        if(!akun){
            return res.status(401).render('login-page', {errorMessage: 'Akun tidak ditemukan.'})
        }
    
        const isMatch = await authService.comparePassword(password, akun.password)
        
        if(!isMatch){
            return res.status(401).render('login-page', {errorMessage: 'Nama atau password salah'})
        }
    
        req.session.user = {
            id: akun.id,
            username: akun.nama
        }
    
        req.session.save((err) => {
            if(err) return res.status(500).render('login', {errorMessage: 'Terjadi kesalahan saat login'})
            res.redirect('/app')

        })
    }catch(err){
        console.log(err)
        return res.status(500).render('login-page', {errorMessage: 'Terjadi kesalahan pada server, coba lagi'})
    }

}

function logout(req, res){
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        return res.redirect('/login')
    })
}

function show(req, res){
    const sql = `SELECT * FROM akun`
    db.query(sql, (err, result) => {
        const hasil = result
        console.log(hasil)
    })
}

module.exports = { createAccount, login, show, logout }