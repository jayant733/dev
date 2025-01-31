
var validator = require('validator');
const bcrypt = require("bcrypt"); //this is used to hash the password
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken")

//we can also create directly wiriting const userSchema = new Schema

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      //this will remove the extra spaces from the data
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      trim: true,
    },

    emailId: {
      type: String,
      required: true,
      unique: true, //this will make sure that the email id is unique //if unique == true then mongodb is going to create an uniquee index on this field
      trim: true,
      lowercase: true, //this will convert the email into lowercase
      index: true, // ensure that MongoDB creates an index for this field
      validator(value){
        if(!validator.isEmail(value)){
          throw new Error("email is not valid ")

        }
      }
    },

    age: {
      type: Number,
      min: 18,
      default:18
    },

    gender: {
      type: String,
      
      enum : {
        values : ["male", "female", "neutral"],
        message  : `{$values} are not correct`
      },
      validate(value){
        if (!["male", "female", "neutral"].includes(value)) {
          throw new Error("this gender is not valid ");
        }
      }
      },
    

    password: {
      type: String,
      required: true,
      validate(value){
        if(!validator.isStrongPassword(value)){
          throw new Error("password is not strong ")
        }
      }
    },
    skills: {
        type: [String],
    
      },
    photoUrl : {
      type : String,
    //   validate(value){
    //     if(validator.isURL(value)){
    //       throw new Error("url is not valid ")  

    //   }
    // }
    } 
    ,
    about : {
      type : String,
      minlength: 3,


    }


  },
  { timestamps: true }
);

// user.find({firstName : "Ambuja" , lastName : "Sharma"})
// userSchema.index({ firstName : 1 , lastName : 1})
//this will run before the save method is called they are basically called the schema methods 

userSchema.methods.validatePassword = async function (passwordbyinput) {
  const user = this;
  console.log(user.password)
  const isMatch = await bcrypt.compare(passwordbyinput, user.password);
  
  if(!isMatch){
    throw new Error("password is not valid")
  } 
  return isMatch;
}

userSchema.methods.getJWT =  async function (){
  const user = this;
  const token = jwt.sign({_id : user._id},"dev@tookensecret")
  console.log(token)
  return token;


}


const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
