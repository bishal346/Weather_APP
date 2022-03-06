const async = require("hbs/lib/async");
const mongoose = require("mongoose"); 
const bcrypt = require("bcryptjs"); 

const user_schema = new mongoose.Schema({
    name : {
        type : String, 
        required : true, 
        trim : true
    }, 
    email : {
        type : String, 
        required : true, 
        trim : true
    },
    phone : {
        type : Number, 
        required : true, 
        trim : true
    }, 
    password : {
        type : String, 
        required : true, 
        trim : true
    },
}); 

user_schema.pre("save", async function(next) {
    if(this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10); 
    }
    next(); 
})

const user = new mongoose.model("user", user_schema); 

console.log("Sucessfull User"); 

module.exports = user; 
