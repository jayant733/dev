const express = require("express")
const {authenticateToken} = require("../Middlewares/auth.js")
const requestrouter = express.Router();
const ConnectionrequestModel = require("../models/connectionrequest.js")
const User = require("../models/user.js")

//this user auth middleware will check for the login check the token and then will give the user
requestrouter.post("/request/send/:status/:toUserId" ,authenticateToken, async (req,res) => {
    try{
        const fromUserId = req.user._id; 
       

      const {status , toUserId} = req.params; 
        

        const allowedstatus = ["ignored", "accepted"]
        if(!allowedstatus.includes(status)){
            return res.status(400).send("invalid status type")
           

        }
        //will check if the touserexits then only we can send the request

        const touser = await User.findById(toUserId)
        if(!touser){
            throw new Error("user does not exists")
            
        }

        //now we have to check if fromuser === to user which is an error 


        //if there is an already existing connection 
        const existingconnection = await ConnectionrequestModel.findOne({
            $or : [
                {fromUserId , toUserId},
                {fromUserId : toUserId, toUserId : fromUserId}
            ]
        })
        
        if(existingconnection){
           
            throw new Error("connection already exists")
        }


        const connectionrequest = new ConnectionrequestModel({
            fromUserId,
            toUserId,
            status,
          
        })

        const data = await connectionrequest.save()
        return res.json({
            message : 
            req.user.firstName + " is interested in " + touser.firstName,
            data : data
        }) 
    }catch(err){
        console.log(err.message)
      return  res.send(err.message)
    }


})

//this is the review request api 
requestrouter.post("/request/review/:status/:connectionrequestId", authenticateToken,async(req,res)=> {
    try{
        const status = req.params.status;
        const connectionrequestId = req.params.connectionrequestId;
        const loggedinuser = req.user;
        console.log(loggedinuser)
        const allowedstatus = ["accepted", "rejected"]
        if(!allowedstatus.includes(status)){
                return res.status(400).send("invalid status type")
        }
      
        const connectionrequest = await ConnectionrequestModel.findById({
            _id : connectionrequestId,
            toUserId : loggedinuser._id, 
            status : "interested"
        })
        console.log(connectionrequest)
        if(!connectionrequest){
            return res.status(404).send("connection request not found ")
 
        }
        connectionrequest.status = status; //this will update the status of the connection request //this status was given by paramas 
        //ye basically connection request ke statu ko accepted ya rejected karne ke liye hai 

        
        const data = await connectionrequest.save() //this should be the last line of the api 
        res.json({
            message : "connection request  updated",
            data : data 
        })
    }catch(err){
        console.log(err.message)
        res.send(err.message)
    }
    
})
  










module.exports = requestrouter 