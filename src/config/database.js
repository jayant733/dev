require('dotenv').config(); // Load environment variables

const mongoose = require("mongoose");

// MongoDB connection URI from environment variables
const MONGODB_URI = process.env.MONGODBCONNECT;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}

module.exports = {
    connectDB
}
