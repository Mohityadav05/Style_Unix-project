const jwt = require('jsonwebtoken');

function verifyuser(req,res,next){
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({message: "not authaunticated"})
    }
    try{
        const decoded = jwt.verify(token,'secretkey');
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({message: "invalid token"})
    }
}

module.exports = verifyuser;