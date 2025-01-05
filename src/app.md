//it creates an express application

//for handling the incoming requestion we create a request handler funciton

//if i change the order of the code then the test2 / help will give the output as hello from the help
// app.use("./test2/help", (req,res)=> {
//     res.send("hello from the help")  //see and play with route extension
// }) // this will still give the console log as hello 2 because the test2 will override the test2/help
// app.use("/test", (req,res)=> {
//     res.send("hello from the server")

// } )//this function is known as the request handler

// app.use("/test2", (req,res)=> {
//     res.send("hello 2");
// })

// app.use("./test2/help", (req,res)=> {
//     res.send("hello from the help")
// }) // this will still give the console log as hello 2 because the test2 will override the test2/help

// app.use(
//   "/user",
//   (req, res, next) => {
//     next();
//     res.send("send1 ");
//   },
//   (req, res, next) => {
//     res.send("CONSOLE.LOG");
//   },
//   (req, res, next) => {
//     res.send("");
//   }
// );


// app.use("/admin" , userauth, (req,res) => {
//     res.send("data from the main send ")
// }
// )


// app.get("/admin/getalldata", (req, res)=> {
//     res.send("get all data is working ")
//     }
//)




// app.get("/getuserdata", (req,res)=> {
//     throw new Error("soimejogjg"); // this is some kind of random error and its to handle the error we will use the try catch block 
//     res.send("the data user")
// })
// app.use("/", (err, req,res, next)=> {
//     if(err){
//         res.status(404).send("something went wrong")
//         console.log(err.message)
//     }
// })


find the meaning of __v 
In MongoDB, __v is a property automatically added by Mongoose, an Object Data Modeling (ODM) library for MongoDB and Node.js. It stands for "version key" and is used by Mongoose to manage document versioning for handling concurrency during updates. When using the save() method to update a document, __v is incremented to track changes to the document



api level validation :-

you are not allowed to update your email id if you have once registered the emailid as for real life purposes it will give an issue 


role of indexing in the real world scenarion compound indexing there are many people with same 
//you might have scene wtih compound indexing 
//we want to keep index on email id as everytime we find user by email id f