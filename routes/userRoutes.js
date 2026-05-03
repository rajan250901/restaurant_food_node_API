const express = require('express');
const router = express.Router();
const  {getAllUser, getUserById, updateUserById, deleteUserById, resetPassword, updatePassword} = require('../controllers/userController');
const authMiddleware = require('../middlewares/authMiddlewares');

router.get('/getusers',authMiddleware, getAllUser);
router.get('/getuserbyid/:id',authMiddleware, getUserById);
router.put('/updateuserbyid/:id',authMiddleware, updateUserById);
router.delete('/deleteuserbyid/:id',authMiddleware, deleteUserById);
router.post('/resetpassword',authMiddleware, resetPassword);
router.post('/updatepassword', authMiddleware,updatePassword);
module.exports = router;