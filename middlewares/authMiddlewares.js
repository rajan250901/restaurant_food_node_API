const jwt = require('jsonwebtoken');

const authMiddleware = async (req,res,next) => {
    // console.log("heekkkko");
    try{
        // console.log("Hello");
        const token = req.headers["authorization"].split(" ")[1];
        // console.log(token);
        
        jwt.verify(token, process.env.JWT_SECRET, (err,decoded) =>{
            if(err){
                return res.status(404).send({
                    success:false,
                    message:"Please provide vaid token"
                })
            }else{
                // console.log(decoded.id);
                // req.body.id = decoded.id;
                req.user = decoded;
                next();
            }

        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in middleware AUTH API "
        })
    }
}

module.exports = authMiddleware;