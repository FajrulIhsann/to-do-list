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
            return res.json({error: 'username sudah digunakan!'})
        }
    }
}

async function login(req, res){
    const {username, password} = req.body
    const sql = `SELECT * FROM akun WHERE nama= ?`
    const [result] = await db.query(sql, [username])
    
    const akun = result[0]
    if(!akun){
        console.log('akun tidak ditemukan')
        return res.redirect('/login')
    }

    const isMatch = await authService.comparePassword(password, akun.password)
    
    if(!isMatch){
        console.log('password atau akun salah')
        return res.redirect('/login')
    }

    req.session.user = {
        id: akun.id,
        username: akun.nama
    }

    await req.session.save()
    res.redirect('/home')

}

function logout(req, res){
    req.session.destroy(() => {
        res.clearCookie('connect.sid')
        res.redirect('/login')
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