var express = require("express");
var app = new express();

app.get("/",function(req,res){
    // res.sendFile(__dirname+"/src/index.html");
    res.send("000");
});

app.listen(process.env.PORT || 8080);