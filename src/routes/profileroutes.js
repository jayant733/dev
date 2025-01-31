const express = require("express")
const User = require("../models/user.js")
const {authenticateToken} = require("../Middlewares/auth.js")
const {validateeditdata} = require("../utils/validators.js")
const profilerouter = express.Router();

profilerouter.get("/searchbyid", async (req,res)=> {
    const id = await req.body._id;
   
    try{
            const user =  await User.findById({_id : id})
    
        if(user.length === 0){
    res.status(404).send("user not found ")
}
else{
    
  
    res.send("the username of this userid is "+ user.firstName)
}}catch(err){
   
    res.status(500).send("something went wrong")        
    
}}) 


profilerouter.get("/profile/view", authenticateToken ,async (req, res)=> {
    try{
        
        const newuser = req.user; //this will give the new user 
        res.send(newuser)
    }
    catch(err){
        console.log(err.message)
        res.status(500).send("something went wrong")    
    }
   

   
})

profilerouter.patch("/update/:userId", async (req,res)=> {
    const id = req.params?.userId;


    const update = req.body;

    try{
        const ALLOWED_UPDATES = ["firstName", "lastName", "skills", "password", "gender", "emailId" , "about", "photoUrl"]

        const isallowedupdates = Object.keys(update).every((k)=>ALLOWED_UPDATES.includes(k))
        console.log(isallowedupdates) //this will return true if all the keys are allowed 
        if(!isallowedupdates){
           throw new Error("invalidkeys")
        }
        if(update.skills.length > 10){
            throw new Error("skills length should be less than 10")
        }
        //this will check if the keys that we are updating are allowed or not
        const user = await User.findByIdAndUpdate({_id : id}, update, {
            runValidators : true, //this will run the validators that we have defined in the schema
            returnDocument: "after" //this will return the updated document

        })
        res.send("user updated successfully")
        console.log(user)
}catch(err){
    console.log(err.message)
    console.log("something went wrong")
    res.status(500).send("something went wrong")    
}},)

profilerouter.get("/feed", async (req, res)=> {
    try{

        const users = await User.find({})
        console.log(users)  
        if(users.length === 0){
            res.status(404).send("no users found")
        }
        else{
            res.send(users)
        }

    }
    catch(err){
        console.log("something went wrong")
        res.status(500).send("something went wrong")    
    }
})
profilerouter.get("/search", async (req,res) => {
   try{
    const useremail = req.body.email;
    console.log(useremail)
    const users = await User.findOne({emailId : useremail})
    if(users.length === 0){
        res.status(404).send("user not found ")
    }
    else{
        res.send(users)
    }
   }
   catch(err){
    console.log("something went wrong")
    res.status(500).send("something went wrong")    
   }
})
profilerouter.patch("/profile/edit" , authenticateToken, async (req, res)=> {
    try{
        if(validateeditdata(req))
        {
            const loggedinuser = req.user; //ye jo logged in user hai wo authenticationtoken se aa raha hai 
            console.log(loggedinuser)
            Object.keys(req.body).forEach((key)=> loggedinuser[key]= req.body[key])
            
            await loggedinuser.save();
             return res.send("user updated succesffuly")

             // will save the data in the database
        } 
        else{
            throw new Error("invalid update")
          
        }
    }
    catch(err){
        res.send(err.message)
    }
})

module.exports = profilerouter 