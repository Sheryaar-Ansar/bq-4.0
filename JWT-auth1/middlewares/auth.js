const jwt = require('jsonwebtoken')

const authenticateUser = (req,res,next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return res.status(401).json({error:'Unauthorized: Token Missing!'})
    }
    const token = authHeader.split(' ')[1]
    try {
        const decode = jwt.verify(token, process.env.KEY)
        req.user = decode
        next()
    } catch (error) {
        res.status(401).json({error: 'Unauthorized: Token Missing!'})
    }
}

module.exports = authenticateUser