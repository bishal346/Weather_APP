const mongoose = require("mongoose"); 
//const validator = require("validator")
mongoose.connect("mongodb://localhost:27017/weather", { 
    //useCreateIndex : true, 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).then(() => {
    console.log("CONNECTION BUILD"); 
    }).catch((err) => {
    console.log(err); 
    });