const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");
const {generateToken}=require("../utils/jwt");



const register = async(data)=>{


    const existing = await prisma.user.findUnique({
        where:{
            email:data.email
        }
    });


    if(existing){
        throw new Error("Email already exists");
    }


    const hash = await bcrypt.hash(
        data.password,
        10
    );


    const user = await prisma.user.create({

        data:{
            username:data.username,
            email:data.email,
            password:hash,
            country:data.country,
            city:data.city
        }

    });


    return user;

};



const login = async(email,password)=>{


    const user = await prisma.user.findUnique({
        where:{
            email
        }
    });


    if(!user){
        throw new Error("Invalid credentials");
    }


    const valid = await bcrypt.compare(
        password,
        user.password
    );


    if(!valid){
        throw new Error("Invalid credentials");
    }



    const token = generateToken({

        id:user.id,

        role:user.role

    });



    return {
        token,
        user
    };

};



module.exports={
    register,
    login
};