import jwt from 'jsonwebtoken';

function authMiddleware(req, res, next){
    const token = req.headers['authorization'];
    //check if there is a token 
    if(!token){return res.status(401).json({message: "No token provided "})}

    //token verification
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
        if(err){return res.status(401).json({message:"Invalid token"})};
        req.userId = decoded.id;
        next(); 
    }) 
    
    
}

export default authMiddleware