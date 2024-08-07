const mongoose = require("mongoose");

function connectToMongo() {
    mongoose.set("strictQuery", true);
    mongoose.connect("", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "careerguru"
    });

    const db = mongoose.connection;

    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
        console.log("Database connected successfully!!\nHappy coding");
    });
}

module.exports = connectToMongo;


// //this is for connecting to mongodb database

// const mongoose = require("mongoose");
// // const dotenv=require("dotenv");
// // dotenv.config({path:'mongo.env'});
// const url="mongodb://localhost:27017/Jobportal";

// function connectToMongo() {
//     mongoose.set("strictQuery", true);
//     mongoose.connect(url,
//         {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         }
//     ); 

//     const db = mongoose.connection;

//     db.on("error", console.error.bind(console, "connection error: "));
//     db.once("open", function () {
//         console.log("Database connected successfully!!\nHappy coding");
//     });
// }

// module.exports = connectToMongo;