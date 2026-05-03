const mongoose = require('mongoose');
const connectDb = async () => {
    // console.log(process.env.MONGO_URL);
    try{
      await mongoose.connect(process.env.MONGO_URL);
      console.log(`connection successfull ${mongoose.connection.host}`);
    }catch (error){
        console.log("db error",error);
    }
}

module.exports = connectDb;