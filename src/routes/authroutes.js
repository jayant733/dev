const express = require("express")
const User = require("../models/user.js")
const jwt = require("jsonwebtoken") 
const bcrypt = require("bcrypt")
const validatesignupdata = require("../models/user.js")

const authrouter = express.Router();


authrouter.post("/signup", async (req,res)=> {
        
   
    try {
 
     
     validatesignupdata(req)
    
     const {firstName, lastName, emailId, password, gender} = req.body;
 
     const hashedpassword = await bcrypt.hash(password , 8); //this will hash the password and will return a promise
 
     const user = new User({
         firstName,
         lastName,
         emailId,
         password : hashedpassword,
         gender
     }) //creating a new instance of the user model and new the name of the model and the data 
     await user.save() //.sabe will return u a promise and will store a data in database 
     console.log("user send  ")
     res.send("user added successfully ") //most of the mongoose will return a promise 
    } catch(err){
     console.log(err)
     res.status(400).send(err.message)
    }
   
 })

 authrouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;

        if (!emailId || !password) {
            return res.status(400).send("Email and password are required");
        }

        const user = await User.findOne({ emailId: emailId });
        if (!user) {
            return res.status(404).send("INVALID CREDENTIALS");
        }

        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
            return res.status(400).send("INVALID CREDENTIALS");
        }

        const token = await user.getJWT();
        res.cookie("token", token, {
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
        });
        return res.send(user);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Something went wrong");
    }
});


authrouter.post("/logout", async (req, res)=> {
    res.cookie("token", null, { expires: new Date(Date.now()), httpOnly: true}) //this will set the cookie to expire and will remove the cookie from the browser
    res.send("logged out")
})
 

module.exports = authrouter;
//app .login === authrouter.login