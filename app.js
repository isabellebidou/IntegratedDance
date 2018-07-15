var express = require("express");// call expresss to be used by application
var app = express();

const path = require('path');
const VIEWS = path.join(__dirname,'views');

app.use(express.static("scripts"));
app.use(express.static("images"));


//function to set up a simple hello response
app.get('/', function(req,res){
    //res.send('hello integrated dance');
    res.render('index.jade', {root: VIEWS});
    console.log('now you are home');
});

app.get('/muscles', function(req,res){
    //res.send('hello integrated dance');
    res.render('muscles.jade', {root: VIEWS});
    console.log('now you are on Muscles');
});

// we need to set the requirements for the application to run

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
    console.log("integrateddance app is running");
    
});