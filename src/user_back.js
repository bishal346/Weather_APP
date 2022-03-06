const express = require("express"); 
const path = require("path"); 

const app = express.Router(); 

//app.set("view engine", "hbs"); 

app.get("/", (req,res) => {
    res.send("HELLO User");
}); 
app.get("/bye", (req,res) => {
    res.send("<h1>Bye USER</h1>"); 
}); 

//console.log("HELLO H"); 
module.exports = app; 