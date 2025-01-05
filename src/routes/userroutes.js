const express = require("express")
const User = require("../models/user.js");   
const { authenticateToken } = require("../Middlewares/auth.js");
const ConnectionrequestModel = require("../models/connectionrequest.js");

const userrouter = express.Router();
//get all the pending connection request for the logged in user 


userrouter.get("/user/requests/recieved", authenticateToken, async ( req, res)=> {
    try{
        const loggedinuser = req.user;
        const connectionrequest = await ConnectionrequestModel.find({
            toUserId : loggedinuser._id,
            status : "interested" //if we dont write this then ignored will also come 
        }).populate("fromUserId", ["firstName", "lastName", "emailId",  ])
        //populate se fromuserid pass kari as first parameter and second parameter me jo bhi chahiye vo pass kara
        
        
        
        res.json({
            message :"data fetched successfully",
            data : connectionrequest
        })
    

    }
    catch(err){
        console.log(err.message)
        res.status(500).send("something went wrong")
    }
})

const USER_SAFE_DATA = "firstName lastName emailId"
//the people whom you are matched with or connected with
userrouter.get("/user/connections", authenticateToken , async (req, res)=> {
    try{
        const loggedinuser = req.user;
        const connectionrequest = await ConnectionrequestModel.find({
            $or : [
                { toUserId : loggedinuser._id, status :"accepted"},
                {fromUserId : loggedinuser._id, status : "accepted"}
            ]

        }).populate("fromUserId", USER_SAFE_DATA).populate("toUserId", USER_SAFE_DATA)
        res.json({
            message : "data fetched successfully",
            data : connectionrequest
        })

    }catch(err){
        console.log(err.message)
        res.status(500).send("something went wrong")
    }
})







userrouter.get("/requestfeed", authenticateToken , async(req ,res) =>{
    try{
        const loggedinuser = req.user;

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;

        const connectionrequest = await ConnectionrequestModel.find({
            $or : [
                { toUserId : loggedinuser._id},
                {fromUserId : loggedinuser._id, }
            ]   
        }).select("fromUserId toUserId ").populate("fromUserId", "firstName").populate("toUserId", "firstName")


        const blockeduserfromfeed = new Set();
        connectionrequest.forEach((request)=> {
            blockeduserfromfeed.add(request.fromUserId._id);
            blockeduserfromfeed.add(request.toUserId._id);
        })
        
 
        const users = await User.find({
           $and : [{ _id : { $nin : Array.from(blockeduserfromfeed)} }, 
            { _id : { $ne : loggedinuser._id}}] 
        }).select(USER_SAFE_DATA).skip((page-1)*limit).limit(limit)

        console.log(users)
        res.send({
            message : "data fetched successfully",
            data : users
        })

        
    }
    catch(err){
            console.log(err.message)
    }
})

//how to add a feature of pagination in this in which we can get 10 users at a time 

module.exports = 
    userrouter
