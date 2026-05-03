const mongoose = require('mongoose');
const restaurantSchema = new mongoose.Schema({
    title : {
        type : String,
        required : [true,  'restaurant title is required']
    },
    imageUrl : {
        type : String,
        required : [true,  'image url is required'],
    },
    foods : {
        type : Array
    },
    time : {
        type : String
    },
    pickup : {
        type : Boolean,
        required : [true,  'pickup is required']
    },
    delivery : {
        type : Boolean,
        required : [true,  'delivery is required']
    },
    isOpen : {
        type : Boolean,
        required : [true,  'isOpen is required']
    },
    logoUrl : {
        type : String
    },
    rating : {
        type : Number,
        default : 1,
        min : 1,
        max : 5        
    },
    ratingCount : {
        type : String
    },
    code : {
        type : String
    },
    coords : {
        id : String,
        latitude : Number,
        latitudedelta : Number,
        longitude : Number,
        longitudedelta : Number,
        address : String,
        title : String
    }},{timestamps:true})

module.exports = mongoose.model('Restaurant', restaurantSchema);