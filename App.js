const express = require("express"); 
const path = require("path"); 
const app = express();
const bcrypt = require("bcryptjs"); 
//const path = require("path"); 
const hbs = require("hbs")
require("./src/connect");  
const user = require("./src/user_sign");
const leader = require("./src/leader_sign"); 
const weather = require("./src/weather"); 
const new_user = require("./src/new_user"); 
const router = require("./src/user_back"); 
const async = require("hbs/lib/async");
const res = require("express/lib/response");
const { render } = require("express/lib/response");
app.set("view engine", "hbs"); 
app.set("views",path.join(__dirname,"/templates/views")); 
hbs.registerPartials(path.join(__dirname,"/templates/partials")); 
//app.use("/user", router); 

app.use(express.urlencoded({extended : false})); 

app.get("/", (req,res) => {
    res.render("home");
}); 
app.get("/new_user", (req,res) => {
    res.render("new_user");
}); 
app.post("/new_user", async (req,res) => {
    try {
        //const password = await bcrypt.hash(req.body.password);
    const input = new new_user({
        name : req.body.name, 
        phone : req.body.phone,
        passward : req.body.password
    }); 
    const arr = await input.save(); 
    res.send(arr);
    }
    catch(err) {
        console.log(err);
    }
}); 
//app.get("/new_u")
app.get("/user", (req,res) => {
    res.render("user"); 
}); 
app.get("/leader", (req,res) => {
    res.render("leader");  
});
app.get("/user/SignUP", (req,res) => {
    res.render("User_signUp", {
        message : ""
    }); 
})
app.post("/user/SignUP", async (req,res) => {
    try {
        if(!req.body.name||!req.body.email||!req.body.phone||!req.body.password) {
            res.render("User_signUp", {
                message : "Please fill up all the details"
            }); 
        }
        const data = new user({
            name : req.body.name, 
            email : req.body.email.toLowerCase(), 
            phone : req.body.phone, 
            password : req.body.password 
        }); 
        const arr = await data.save(); 
        console.log(arr); 
        //res.send(arr); 
        res.render("user_page");
    }
    catch(err) {
        console.log(err); 
        res.render("User_signUp", {
            message : "Invalid Details"
        }); 
    }
}); 
app.get("/leader/SignUP", (req,res) => {
    res.render("Leader_signUp", {
        message : ""
    }); 
})
app.post("/leader/SignUP", async (req,res) => {
    try {
        if(!req.body.name||!req.body.email||!req.body.phone||!req.body.password) {
            res.render("Leader_signUp", { 
                message : "Please fill up all the details"
            }); 
        }
        const data = new leader({
            name : req.body.name, 
            email : req.body.email.toLowerCase(), 
            phone : req.body.phone, 
            password : req.body.password 
        }); 
        const arr = await data.save(); 
        console.log(arr); 
        //res.send(arr); 
        res.render("leader_page");
    }
    catch(err) {
        res.render("Leader_signUp", { 
            message : "Invalid Details"
        });
    }
}); 
app.get("/user/LogIn", (req,res) => {
    res.render("User_LogIn",{
        message : ""
    }); 
})
app.post("/user/LogIn", async (req,res) => {
    try{
        const emailId = req.body.email; 
        const pass = req.body.password; 
        const brr = await user.find({email : emailId.toLowerCase()}); 
        console.log(brr[0]);
        const check = await bcrypt.compare(pass,brr[0].password); 
        console.log(check)
        if(!check) {
            res.render("User_LogIn",{
                message : "Invalid LogIN Details."
            });  
        }
        else {
            res.render("user_page"); 
        }
    //const arr = await data.save(); 
        //console.log(arr); 
        //res.send(arr); 
    }
    catch(err) {
        res.render("User_LogIn",{
            message : "Invalid LogIN Details."
        }); 
    }
}); 
app.get("/leader/LogIn", (req,res) => {
    res.render("Leader_LogIn",{
        message : ""
    }); 
})
app.post("/leader/LogIn", async (req,res) => {
    try{
        const emailId = req.body.email; 
        const pass = req.body.password; 
        const brr = await leader.find({email : emailId.toLowerCase()}); 
        console.log(brr[0]);
        const check = await bcrypt.compare(pass,brr[0].password); 
        console.log(check)
        if(!check) {
            res.render("Leader_LogIn",{
                message : "Invalid LogIN Details."
            });  
        }
        else {
            res.render("leader_page"); 
        }
    //const arr = await data.save(); 
        //console.log(arr); 
        //res.send(arr); 
    }
    catch(err) {
        res.render("Leader_LogIn",{
            message : "Invalid LogIN Details."
        }); 
    }
}); 
app.get("/user/about", (req,res) => {
    res.render("about"); 
});
app.get("/leader/about", (req,res) => {
    res.render("leadAbout"); 
});
app.get("/leader/weather_insert", (req,res) => {
    res.render("weather_inst", { 
        message : ""
    }); 
}); 
app.post("/leader/weather_insert", async (req,res) => {
    try{
        if(!req.body.place||!req.body.temparature||!req.body.rain) {
            res.render("weather_inst", { 
                message : "Please fill up all the details"
            }); 
        }
        console.log(req.body); 
        const s = req.body.place; 
        const x = s.toLowerCase(); 
        console.log(x); 
        const data = new weather({
            place : x, 
            temparature : req.body.temparature, 
            rain : req.body.rain
        }); 
        const arr = await data.save(); 
        console.log(arr); 
        //res.send(arr); 
        res.render("weather_inst", { 
            message : "Thankyou for your contribution"
        });
    }
    catch(err) {
        console.log(err); 
        res.render("weather_inst", { 
            message : "Invalid Details"
        });
    }
}); 
app.get("/user/weather_search", (req,res) => {
    res.render("weather_find", { 
        message : "",
        place : "",
        temp : "", 
        Rain : ""
    }); 
}); 
app.post("/user/weather_search", async (req,res) => {
    try {
        if(!req.body.place) {
            res.render("weather_find", { 
                message : "Invalid Place name",
                place : "",
                temp : "", 
                Rain : ""
            }); 
        }
        const place = req.body.place; 
        const arr = await weather.find({place : place.toLowerCase()}); 
        res.render("weather_find", { 
            message : "Sucess",
            place : place.toUpperCase(),
            temp : `Temparature : ${arr[0].temparature} C`, 
            Rain : `Rain Fall : ${arr[0].rain} cm`
        }); 
    }
    catch(err) {
        res.render("weather_find", { 
            message : "Invalid Place name",
            place : "",
            temp : "", 
            Rain : ""
        }); 
    }
}); 
app.get("/user_name", async (req,res) => {
    const arr = await user.find({}); 
    res.send(arr); 
}); 
app.get("/leader_name", async (req,res) => {
    //const arr = await leader.deleteMany({_id : "62089dfc140bf525ac3026e8"}); 
    const arr = await leader.find({}); 
    res.send(arr); 
}); 
app.get("/weather_name", async (req,res) => {
    //const arr = await leader.deleteMany({_id : "62089dfc140bf525ac3026e8"}); 
    const arr = await weather.find({}); 
    res.send(arr); 
}); 
app.get("/insert", async (req,res) => {
    const data = new user({
        name : "Mohit Verman ", 
        email : "        mothi@gmail.com        ", 
        phone : 8957302865, 
        password : "motwani" 
    }); 
    const arr = await data.save(); 
    console.log(arr); 
    res.send(arr); 
}); 
app.get("/check", async (req,res) => {
    const boli = await bcrypt.compare("motwani", "$2a$10$iyQl695K.pjsdzRGiIisx.cr1R4DNJxOlw.iDoyQ2U5npsjDyXVZa"); 
    console.log(boli); 
    res.send("ENDUP"); 
}); 
app.get("/tester", (req,res) => { 
    res.render("pre_header"); 
});
app.listen(8000,() => {
    console.log("Listening to you (Mr. 8000) Bishal")
});