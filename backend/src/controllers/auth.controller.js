const authService = require("../services/auth.service");



const register = async(req,res)=>{


    try{

        const user = await authService.register(req.body);


        res.status(201).json(user);


    }catch(error){

        res.status(400).json({
            message:error.message
        });

    }

};



const login = async(req,res)=>{


    try{


        const result =
        await authService.login(
            req.body.email,
            req.body.password
        );


        res.json(result);


    }catch(error){

        res.status(401).json({
            message:error.message
        });

    }


};



const me = async(req,res)=>{


    res.json(req.user);


};



module.exports={
    register,
    login,
    me
};