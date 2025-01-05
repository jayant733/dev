const mongoose = require('mongoose');   

const connectionrequestSchema = new mongoose.Schema({

    fromUserId : 
    {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'  //this will manage a link btw the user and the connection request
    },
    toUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'


    },
    status : {
        type : String,
        required : true,
        enum : {
            values :   ["accepted", "rejected", "ignored", "interested"],
            message : `{values} are not supported`
        }
          

    }
}, {timestamps : true })
connectionrequestSchema.index({fromUserId : 1, toUserId : 1})


connectionrequestSchema.pre("save", function(next){
    const connectionrequest = this; //this will be kind a middleware it will we called before the save method is called
    //check if the fromuserid and touserid are same
    if(connectionrequest.fromUserId === connectionrequest.toUserId){
        throw new Error("from user and to user cannot be same")
    }
    next(); //everytime we call the next it will go to the next middleware
})
  //this is a pre middlware we have to create 


const ConnectionrequestModel = new mongoose.model("Connection Request", connectionrequestSchema)

module.exports = ConnectionrequestModel