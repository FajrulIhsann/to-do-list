function apiRequireAuth(req, res, next){
    if(!req.session.user){
        return res.status(401).json({error: 'Anda perlu login!'})
    }
    next()
}

function guestOnly(req, res, next){
    if(req.session.user){
        return res.redirect('/app')
    }

    next()
}

function authOnly(req, res, next){
    if(!req.session.user){
        return res.redirect('/login')
    }
    next()
}

module.exports = {apiRequireAuth, guestOnly, authOnly}