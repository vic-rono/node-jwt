
const jwt = require('jsonwebtoken')

module.exports = function auth(req, res, next) {
    const token = req.header('auth-token');
    if(!token) return res.status(401).json('Access Denied')

    try{
    const verified = jwt.verify(token, process.env.SECRET_TOKEN)
    req.user = verified
    next();
    }catch(err){
        res.status(400).json('Invalid Token')
    }

}