const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewares');
const {getAllRestaurant, createRestaurant, getRestaurantById, updateRestaurantById, deleteRestaurantById} = require('../controllers/restaurantController')

router.get('/getallrestaurant', authMiddleware, getAllRestaurant);
router.post('/createrestaurant', authMiddleware, createRestaurant);
router.get('/getrestaurantbyid/:id', authMiddleware, getRestaurantById);
router.put('/updaterestaurantbyid/:id', authMiddleware, updateRestaurantById);
router.delete('/deleterestaurantbyid/:id', authMiddleware, deleteRestaurantById);

module.exports = router;