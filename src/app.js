//const {userauth} = require("../Middlewares/auth.js")
//this is the starting point of the applicaiton

//first step we need to create a backedn

const express = require("express");

const app = express();
const {connectDB }= require('./config/database.js')

const cookieParser = require("cookie-parser")
const cors = require("cors")
const userrouter = require("../src/routes/userroutes.js")
const authrouter = require("../src/routes/authroutes.js")
const profilerouter = require("../src/routes/profileroutes.js")
const requestrouter = require("../src/routes/requestroutes.js")
//creating a new instance of the data and saving the data setup 
app.use("/", express.json()) //this is the middleware that will help us to read the json data from the request body 
app.use("/", cookieParser())
app.use("/",cors({
    origin  : "http://localhost:5173", //this will give by default connect frontend to backedn
    credentials : true // this is whitelisting the origin
})) 
app.use("/", authrouter)
app.use("/", profilerouter)
app.use("/", requestrouter)
app.use("/" ,userrouter)   
//connectdb is a function so function pe hi .then .catch lagega ya fir try ya catch lagega 





connectDB().then(
    ()=> { 
        console.log("database connetion estabilished")
        //cluster connected 
        app.listen(3000, () => {
            console.log("serverS is running ");
          }); // this is the port where the server is runnning A
    }
).catch((err)=> {
    console.error("database cannot be connected ")
})

