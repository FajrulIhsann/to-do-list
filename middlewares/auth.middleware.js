function apiRequireAuth(req, res, next){
    if(!req.session.user){
        res.status(401).json({error: 'Anda perlu login!'})
    }
    next()
}


module.exports = {apiRequireAuth}