npm init will just create a package.json file which will show like the index of the file 

first step is to create a server where you will listen means you need to listen to the upcomoing request 

to create server we will use the express js point ...this application will run and will help to listen the incoming request 

package.lock.json and node modules are the 

node modules are the place where when i downloaded express all the code of express js or some other package will come in this node modules folder ...ecpress also has some other dependent library so all the other npm libraries on which express dependent so that libraries will also be put in node modules 

package.lock.json 

version of a package 4.19.2 means major update minor version and patch (kitne changes ) express started froom 1.0.0 and go to 4.19.2  bug fix comes under patching.... not a major version change the previous code will also be working without any break in code 4.19.2 => 4.20.3 work karega (backward compatablile rahega ) but eventually 4.19.3 => 5.x.x so nhi rahega  
^ :- carot our project will automatically update if there is a new update // it will allow to auto update to 4.x.x major varsion pe shift nhi karega 
^4.19.2 in package json is not logged agar minor change aaya to fir woh auto update karega but package json me change mhi hoga so to know the exact version of our project it will be in the package lock json will tell you the exact version 
~ :- 
if i dont use 

~: Allows updates within the same minor version.
^: Allows updates within the same major version.




create a repository and push the code 




now i will write the code of the 2nd commit 

order on the routes do matter in the api handling 
when something we type some url we make some get api call to the server and then do work 
to make a post api call directly from the breowser we will need code and cant do it directly 
so we will use a software known as post man 


in the app.use we can add as many route handler and we can also add it in a array 

route handlers is just the function that is handling the code 


we have to write the code in such a fashion that the database connection should be first then the server should listen to the request calls this is correct as if request call comes first and database not working then it is not good 


schema is a way through which what all things should be required to be there in a database 
mongoose only gives schema 

database refresh hamesha left se hoga 
each object means 1 doucment there is a database which has collection and then there is document

mod 7 
:- here i will learn how to send dynamic data 
Aspect	JavaScript Object	JSON
Definition	A data structure in JavaScript	A data format for exchanging data
Syntax flexibility	Flexible, keys can be unquoted	Strict, keys must be strings in double quotes
Data types	Can include functions, symbols, undefined, etc.	Limited to numbers, strings, booleans, arrays, objects
Usage	Used to store and manipulate data in JavaScript	Used for data exchange (e.g., between client and server)
Parsing/Serialization	Not required for use in JS, directly accessible	Must be parsed (using JSON.parse()) or stringified (JSON.stringify())
Language-specific	JavaScript-only	Language-independent, supported in many environments


the middleware we use to parse the json object will be app.use(express.json())

            PUT	                                        PATCH
Operation	Full update/replacement   	        Partial update
Request Data	Entire resource data required	    Only fields that need updating
Idempotency	Yes	Yes

Use Case	Replace a resource entirely	        Modify   specific attributes