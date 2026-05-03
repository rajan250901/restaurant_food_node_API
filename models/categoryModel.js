const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true,  'title is required'],
  },
  imageUrl : {
        type : String,
        required : [true,  'image url is required'],
    }
},{timestamps:true});

module.exports = mongoose.model('Category', categorySchema);