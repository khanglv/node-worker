const jwt = require('jsonwebtoken')

const tokenMaster = 'Khanglv';
function createToken(){
    return jwt.sign({ data: tokenMaster }, 'secretkey', { expiresIn: 180 });
}

async function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        if (token === null) return res.status(500).json({ error: error.message }) // if there isn't any token
    
        jwt.verify(token, 'secretkey', (err, user) => {
            if (err) return res.sendStatus(403)
            req.user = user
            next() //pass the execution off to whatever request the client intended
        })
    }else{
        return res.status(403).json({ error: "token not avalible" })
    }
}
module.exports = {
    auth: authenticateToken,
    create: createToken
}