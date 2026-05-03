const orderModel = require('../models/orderModel');
const createOrder = async (req,res) =>{
    try{
        const {user, items, totalPrice, status, paymentMethod, paymentStatus } = req.body;
        if(!user || !items || !totalPrice){
            return res.status(404).send({
                success:false,
                message:"Please provide all required fields"
            })
        }
        const order = await orderModel.create({user, items, totalPrice, status, paymentMethod, paymentStatus});
        if(!order){
            return res.status(404).send({
                success: false,
                message: "order not created, unable to create or save orders"
            })
        }
         return res.status(201).send({
            success:true,
            message:"Order created successfully"
         })
        
    }catch(error){
        return res.status(404).send({
            success: false,
            message: "Error in create order API",
            error
        })
    }
}

const getAllOrders = async (req,res) =>{
    try{
        const orders = await orderModel.find();
        if(!orders){
            return res.status(404).send({
            success: false,
            message: "orders not found"
        })
        }
        return res.status(200).send({
            success: true,
            message: "All orders fetched successfully",
            orders
        })
    }catch(error){
        return res.status(500).send({
            success: false,
            message: "Error in get order API",
            error
        })
    }
}

const getOrderById = async (req,res) =>{
    try{
const {id} = req.params;
    const order = await orderModel.find({id});
    if(!order){
        return res.status(404).send({
            success: false,
            message: "order not found"
        })
    }
    return res.status(200).send({
        success:true,
        message:"order with the given id fetched successfully",
        order
    })
    }catch(error){
        return res.status(500).send({
            success:false,
            message: "Error in get order by id API",
            error
        })
    }
}

const deleteOrderById = async (req,res) =>{
    try{
 const {id} = req.params;
    const deletedOrder = await orderModel.findByIdAndDelete({id});
    if(!deletedOrder){
        return res.status(404).send({
            success: false,
            message: "order not found",
            error
        })
    }
    return res.status(200).send({
        success: true,
        message: "Specific order deleted successfully",
        deletedOrder
    })
    }catch(error){
        return res.status(200).send({
            success:false,
            message:"Error in delete order API",
            error
        })
    }
}

module.exports = {createOrder, getAllOrders, getOrderById, deleteOrderById};