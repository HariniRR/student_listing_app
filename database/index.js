const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');
    }
    catch(err){
        console.log('MongDB connection failed');
        throw err;
    }
}

module.exports = connectDB;