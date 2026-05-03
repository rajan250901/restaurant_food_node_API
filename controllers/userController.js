const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

const getAllUser = async (req,res) =>{
    try{
        const user = await userModel.find();
        // console.log(user);
        if(!user){
            return res.status(404).send({
                success:false,
                message:"Users not found"
            })
        }

        const safeUsers = user.map(user => {
            user.password = undefined;
            return user;
        });
        // user.password=undefined;
        return res.status(200).send({
            success:true,
            message:"user data",
            user:safeUsers
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Please provide valid API",
            error
        })
    }
}

const getUserById = async (req,res) =>{
    try{
        // console.log(req);
        const id = req.params.id;
        // console.log(id);
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        return res.status(200).send({
            success:true,
            message:"user find successfully",
            user
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Please provide valid API",
            error
        })
    }
}

const updateUserById = async (req,res) =>{
    try{
        const id = req.params.id;
        const user = await userModel.findById(id);
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }
        // console.log(req);
        const {userName, email, address, phone} = req.body;
        // console.log(email);
       if(userName) user.userName = userName;
       if(email) user.email = email;
       if(address) user.address = address;
       if(phone) user.phone = phone;
       await user.save();
       return res.status(200).send({
        success:true,
        message:"user updated successfully",
        user
       })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in update user API",
            error
        })
    }
}

const deleteUserById = async (req,res) =>{
    try{
        const id = req.params.id;
        const user = await userModel.findByIdAndDelete(id);
       
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        return res.status(200).send({
            success:true,
            message:"user deleted successfully"
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Please provide valid API",
            error
        })
    }
}

const resetPassword = async (req,res) =>{
    try{
        const {email, newPassword, answer} =req.body;
        console.log(email,newPassword, answer);
        if(!email || !newPassword ||!answer){
            return res.status(404).send({
                success:false,
                message:"Please provide all details"
            })
        }
// console.log("hello");

        const user = await userModel.findOne({email,answer});
// console.log(user);
        if(!user){
            return res.status(404).send({
                success:true,
                message:"user not found"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        // console.log(user);
        await user.save();

        return res.status(200).send({
            success:true,
            message:"password reset successfully",
            user
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"error in reset password API",
            error
        })
    }
}

const updatePassword = async (req,res) =>{
    try{
        // console.log(req.user.id);
        const id = req.user.id;
        const {oldPassword, newPassword} = req.body;
        const user = await userModel.findById(id);
        // console.log(user);
        if(!oldPassword || !newPassword){
            return res.status(404).send({
                success:false,
                message:"Please provide all the fields"
            })
        }
        
        if(!user){
            return res.status(404).send({
                success:false,
                message:"user not found"
            })
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if(!isMatch){
            return res.status(200).send({
                success:false,
                message:"provided old password is not correct"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).send({
            success:true,
            message:"user updated password successfully",
            user
        })
    }catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"error in update password API",
            error
        })
    }
}
module.exports = {getAllUser, getUserById, updateUserById, deleteUserById, resetPassword, updatePassword};