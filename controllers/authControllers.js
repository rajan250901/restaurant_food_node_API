const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const registerController = async (req,res) =>{
    try{
        const {userName, email, password, address, phone, userType, profile, answer} = req.body;

        if(!userName || !email || !password || !address || !phone || !answer){
            return res.status(500).send({
                success : false,
                message:'Please provide all fields'
            })
        }
        const isExisting = await userModel.findOne({email});
        if(isExisting){
            return res.status(500).send({
                success:false,
                message:'Email already registered, Please login'
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await userModel.create({userName, email, password:hashedPassword,address, phone, answer});
        user.password=undefined;
        return res.status(201).send({
            success:true,
            message:'user successfully registered',
            user
        })

    }catch(error){
        console.log("error in register", error);
    }
}

const loginController = async(req,res) =>{
try{
    const {email,password} = req.body;
    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:"Please provide all fields"
        })
    }
   
    const user = await userModel.findOne({email});
   
    if(!user){
        return res.status(401).send({
            success:false,
            message:"User not found, Please register"
        })
    }

    const isMatch = await bcrypt.compare(password, user.password);

   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    if(!isMatch){
        return res.status(401).send({
            success:false,
            message:"Invalid Credentials"
        })
    }

    user.password = undefined;
    return res.status(200).send({
            success:true,
            message:"Login Successfull",
            token,
            user
        })
}catch{
    return res.status(500).send({
        success:false,
        message:"Error in login API"
    })
}
}

module.exports = {registerController,loginController};