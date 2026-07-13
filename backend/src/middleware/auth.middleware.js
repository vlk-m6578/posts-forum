const jwt = require("jsonwebtoken");
const prisma = require("../config/prisma");


const authMiddleware = async (req,res,next)=>{

    try {

        const header = req.headers.authorization;


        if(!header){
            return res.status(401).json({
                message:"No token provided"
            });
        }


        const token = header.split(" ")[1];


        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );


        const user = await prisma.user.findUnique({
            where:{
                id: decoded.id
            }
        });


        if(!user){
            return res.status(401).json({
                message:"User not found"
            });
        }


        req.user = user;


        next();


    } catch(error){

        return res.status(401).json({
            message:"Invalid token"
        });

    }

};


module.exports = authMiddleware;