const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middlewares/authMiddlewares')
const {getAllCategories, createCategories, getCategoriesById, updateCategoriesById, deleteCategoriesById} = require('../controllers/categoryController')

router.get('/getallcategories',authMiddlewares,getAllCategories);
router.post('/createcategories',authMiddlewares,createCategories);
router.get('/getcategoriesbyid/:id',authMiddlewares,getCategoriesById);
router.put('/updatecategoriesbyid/:id',authMiddlewares,updateCategoriesById);
router.delete('/deletecategoriesbyid/:id',authMiddlewares,deleteCategoriesById);

module.exports = router;