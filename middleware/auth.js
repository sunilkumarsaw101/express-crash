const jwt= require('jsonwebtoken');

const jwtAuthentication=(req, res, next)=>{
    const token= req.headers['authorization'];
    // console.log('tokennnn',token);
    if(!token) return res.status(400).json({"message":"Token is not present"});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user)=>{
        // console.log('this is error',err);
        if(err){
            return res.status(400).json({"message":"Token Invalid.."})
        }

        req.user= user;
        next();
    })
   

}

module.exports= jwtAuthentication;