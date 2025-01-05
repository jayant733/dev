const validator = require("validator")

const validatesignupdata = (req)=> {
    const {emailId, password , firstName , lastName} = req.body;
    console.log(firstName)
    console.log(lastName)
    console.log(password)
    if(!(firstName || lastName) ){
        throw new Error("first name and last name are required ")
    }
    else if (firstName.length <4 || firstName.length > 20 || lastName.length <4 || lastName.length > 20){ 
        throw new Error("first name and last name should be between 4 and 20 characters "

        )
    }
    else if(!validator.isEmail(emailId)){
        throw new Error("email is not valid")
        
    }
    else if (!validator.isStrongPassword(password)){
        throw new Error("password is not strong ")
    }
}

const validateeditdata = (req) => {
   const allowededitfeilds = ["firstName" , "lastName", "photoUrl", "gender", "age", "skills"]
    const iseeditallowed = Object.keys(req.body).every((keys)=> allowededitfeilds.includes(keys))

    return iseeditallowed
}   
module.exports = {
    validatesignupdata,
    validateeditdata
}