//here therer will be a library to connect to your database .js 
//so we will use mongoose to connect to the database 
//:- read the mongoose database 


const mongoose = require("mongoose")

//always wrap these function inside a async await 


const connectDB = async () => {
    await mongoose.connect("mongodb+srv://jayantsharma3228:jayantsharma@namastedev.bxcb3.mongodb.net/devChat")
}


module.exports ={
    connectDB
}
