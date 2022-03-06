const async = require("hbs/lib/async");
const mongoose = require("mongoose"); 
const bycrypt = require("bcryptjs");
const bcrypt = require("bcryptjs/dist/bcrypt");
const user_Schema = new mongoose.Schema({
    name : {
        type : String, 
        required : true
    }, 
    phone : {
        type : Number, 
        required : true
    }, 
    passward : {
        type : String, 
        required : true
    }
})
// user_Schema.pre("save", async function(next) {
//     if(this.isModified("passward")) {
//         this.passward = bycrypt.hash(this.passward);
//     }
//     next();
// })
user_Schema.pre("save", async function(next) {
    if(this.isModified("passward")) {
        this.passward = await bcrypt.hash(this.passward, 10); 
    }
    next(); 
})
const newUser = mongoose.model("newuser", user_Schema); 


console.log("NEW USER STRART"); 
module.exports = newUser