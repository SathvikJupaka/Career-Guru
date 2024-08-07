const express = require("express");
const cors = require("cors");
const dotenv=require("dotenv");
const connectToMongo = require("./database/dbconfig");
const bodyParser = require('body-parser');
const recruiterApis = require("./APIS/recruiterApis");
const userApis = require("./APIS/userApis");
const path=require("path");

const app = express();


dotenv.config();
connectToMongo();

app.use(cors());
app.use(bodyParser.json());

app.use("/user-api", userApis);
app.use("/recruiter-api", recruiterApis);

//-----------------deployment---------------------
const __dirname1=path.resolve();
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname1,'/frontend/build')))
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname1,"frontend","build","index.html"));
    })
}
else{
    app.get("/",(req,res)=>{
        res.send("API is running successfully..");
    })
}

//-----------------deployment---------------------





//create a middleware to handle invalid path
const invalidPathHandlingMiddleware = (request, response, next) => {
  response.send({ message: "Invalid path" });
};
  
app.use(invalidPathHandlingMiddleware);
  
  //create err handling middleware
const errHandler = (error, request, response, next) => {
  response.send({ "error-message": error.message });
};
app.use(errHandler);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("backend server running successfully!!");
});