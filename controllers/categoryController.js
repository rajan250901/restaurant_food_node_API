const categoryModel = require('../models/categoryModel')
const getAllCategories = async (req,res) => {
    try{
        const categoriesData = await categoryModel.find();
        if(!categoriesData){
            return res.status(404).send({
                success:false,
                message:"No categories added, categories data not found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"List of all categories fetched successfully",
            categoriesData
        })
    }
    catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in Get categories API"
        })
    }
}

const createCategories = async (req,res) => {
    try{
        const {title, imageUrl} = req.body;
        if(!title || !imageUrl){
            return res.status(404).send({
                success:false,
                message:"All fields are required"
            })
        }
        const categoryAdded = await categoryModel.create({title,imageUrl});
        if(!categoryAdded){
            return res.status(404).send({
            success:false,
            message:"failed to add category"
            })
        }
        return res.status(200).send({
            success:true,
            message:"category added successfully",
            categoryAdded
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in create Categories API"
        })
    }
}

const getCategoriesById = async (req,res) => {
    try{
        const id = req.params.id;
        const categoryDataById = await categoryModel.findById(id);
        if(!categoryDataById){
            return res.status(404).send({
                success:true,
                message:"failed to fetch category data by id, categories not found"
            })
        }
        return res.status(200).send({
            success:true,
            message:"fetched categories data by id successfully",
            categoryDataById
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in get categories by id API"
        })
    }
}

const updateCategoriesById = async (req,res) => {
    try{
        const id = req.params.id;
        // console.log(id);

        const categoriesData = await categoryModel.findById(id);
        // console.log(categoriesData);
        if(!categoriesData){
            return res.status(404).send({
                success:false,
                message:"categories not found"
            })
        }
        const {title, imageUrl} = req.body;
        if(title){
            categoriesData.title = title;
        }
        if(imageUrl){
            categoriesData.imageUrl = imageUrl;
        }
        const updatedCategoriesData = await categoriesData.save();
        return res.status(200).send({
            success:true,
            message:"categories updated successfully",
            updatedCategoriesData
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in update Categories API"
        })
    }
}

const deleteCategoriesById = async (req,res) =>{
    try{
        const id = req.params.id;
        const deleteCategories = await categoryModel.findByIdAndDelete(id);
        if(!deleteCategories){
            return res.status(404).send({
                success:false,
                message:"failed to delete categories by id"
            })
        }
        return res.status(200).send({
            success:true, 
            message:"categories deleted successfully"
        })
    }catch(error){
        return res.status(500).send({
            success:false,
            message:"Error in delete categories by id API"
        })
    }

}

module.exports = {getAllCategories, createCategories, getCategoriesById, updateCategoriesById, deleteCategoriesById};