var express = require("express");
var app = express();

app.use("",express.static(__dirname+("/dist")));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/dist/index.html");
    // res.send("000")
});

app.listen(process.env.PORT || 4200);