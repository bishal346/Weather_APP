const mongoose = require("mongoose"); 

const Weth_schema = new mongoose.Schema({
    place : {
        type : String, 
        required : true, 
        unique : true,
        trim : true
    },
    temparature : {
        type : Number, 
        required : true,  
    },
    rain : {
        type : Number, 
        required : true
    }
}); 

const weather = new mongoose.model("weath_table", Weth_schema); 

console.log("Sucessfull Weather"); 

module.exports = weather; 