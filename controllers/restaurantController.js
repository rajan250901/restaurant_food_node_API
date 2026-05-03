const restaurantModel = require('../models/restaurantModel');

const createRestaurant = async (req,res) =>{
    try{
        const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body;
        if(!title || !imageUrl || !pickup || !delivery || !isOpen){
            return res.status(404).send({
                success:false,
                message:"Please provide all required fields"
            })
        }
        const restaurant = await restaurantModel.create({title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords});
        return res.status(200).send({
            success:true,
            message:"restaurant data updated successfully",
            restaurant
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in create restaurant API",
            error
        })
    }
}

const getAllRestaurant = async (req,res) =>{
    try{
        // const id = req.body.id;
        const restaurant = await restaurantModel.find();
        if(!restaurant){
            return res.status(404).send({
                success:false,
                message:"restaurant not found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"List of all restaurants fetched successfully",
            restaurant
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in Restaurant Controller API",
            error
        }) 
    }
}

const getRestaurantById = async (req,res) =>{
   try{
    const id = req.params.id;
    const restaurantData = await restaurantModel.findById(id);
    if(!restaurantData){
        return res.status(404).send({
            success:false,
            message:"Specific restaurant data is not found"
        })
    }
    return res.status(200).send({
        success:true,
        message:"Restaurant data by id fetched successfully", 
        restaurantData
    })
   }catch(error){
    return res.status(500).send({
        success:false,
        message:"Error in get Restaurant by id API"
    })
   }
}

const updateRestaurantById = async (req,res) =>{
    try{
        // console.log("hello");
    const id = req.params.id;
    const restaurantData = await restaurantModel.findById(id);
    // console.log(restaurantData);
    if(!restaurantData){
        return res.status(404).send({
            success:false,
            message:"Specific restaurant item is not found"
        })
    }  
    const {title, imageUrl, foods, time, pickup, delivery, isOpen, logoUrl, rating, ratingCount, code, coords} = req.body;
    if(title) restaurantData.title = title;
    if(imageUrl) restaurantData.imageUrl = imageUrl;
    if(foods) restaurantData.foods = foods;
    if(time) restaurantData.time = time;
    if(pickup) restaurantData.pickup = pickup;
    if(delivery) restaurantData.delivery = delivery;
    if(isOpen) restaurantData.isOpen = isOpen;
    if(logoUrl) restaurantData.logoUrl = logoUrl;
    if(rating) restaurantData.rating = rating;
    if(ratingCount) restaurantData.ratingCount = ratingCount;
    if(code) restaurantData.code = code;
    if(coords) restaurantData.coords = coords;
    await restaurantData.save();
        return res.status(200).send({
            success:true,
            message:"Restaurant data updated successfully",
            restaurantData
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in get restaurant API"
        })
    }
}

const deleteRestaurantById = async (req,res) =>{
    try{
        const id = req.params.id;
        // console.log(id);
        const deleterestaurant = await restaurantModel.findByIdAndDelete(id);
        // console.log(deleterestaurant);
        if(!deleterestaurant){
            return res.status(404).send({
                success:false,
                message:"Restaurant item not found to delete"
            })
        }
        return res.status(200).send({
            success:true,
            message:"Restaurant Item deleted successfully"
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in delete restaurant API"
        })
    }
    // const id = req.params.id;
}

module.exports = {createRestaurant, getAllRestaurant, getRestaurantById, updateRestaurantById, deleteRestaurantById};