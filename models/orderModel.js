const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Restaurant"
      },
      quantity: {
        type:Number
      }
    }
  ],
  totalPrice: {
    type:Number
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "preparing", "delivered"],
    default: "pending"
  },
  paymentMethod: {
    type: String
  },
  paymentStatus: {
    type: String
  }
},{timestamps:true});

module.exports = mongoose.model('Order', orderSchema);