const { hash } = require('bcrypt')
const authService = require('../service/authService')
const db = require = require('../connection/database')


async function createAccount(req, res) {
    const {username, password} = req.body

    const hashedPassword = await authService.hashPassword(password)

    const sql = `INSERT INTO akun (nama, password) VALUES (?, ?)`
    db.query(sql, [username, hashedPassword], (err, result) =>{
        if(err) throw err
        res.redirect('/')
    })
}

function login(req, res){
    const {username, password} = req.body
    
    const sql = `SELECT * FROM akun WHERE nama=?`
    db.query(sql, [username], async (err, result)=>{
        const akun = result[0]

        if(!akun){
            return alert('Akun Tidak Ditemukan!')
        }

        const isMatch = await authService.comparePassword(password, akun.password)

        if(!isMatch){
            return alert('Nama atau Password salah!')
        }

        req.session.user = {
            id: akun.id,
            username: username
        }

        res.redirect('/dashboard')
    })
}