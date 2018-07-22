var express = require("express");// call expresss to be used by application
var app = express();
//var behaviour = require('./behaviour.js');
//const jsdom = require("jsdom");
//const { JSDOM } = jsdom;//https://www.npmjs.com/package/jsdom

app.set('view engine', 'jade');

var mysql = require('mysql');


const path = require('path');
const VIEWS = path.join(__dirname,'views');

app.use(express.static("scripts"));
app.use(express.static("images"));


const db = mysql.createConnection({
  host: 'isabellebidou.com',
  user: 'isabelle_isabelle',
  password:'lelion66',
  database:'isabelle_db',
  port:3306
});
db.connect((err) =>{
  if (err){

  throw(err)
  }else{
    console.log("db connected!");
           
           }
});


//function to set up a simple hello response
app.get('/', function(req,res){
   // res.sendFile('index.html', {root: VIEWS},behaviour);
    res.render('index', {root: VIEWS});
    console.log('now you are home');
});

app.get('/muscles', function(req,res){
   // res.sendFile('muscles.html', {root: VIEWS});
    
    let sql = 'SELECT * FROM muscles'
    let query = db.query(sql, (err, res1) => {
    if(err) throw err;
    console.log(res1);

    res.render('muscles.jade', {root: VIEWS,res1});
  });
    console.log('now you are on Muscles');
});

app.get('/asanas', function(req,res){
   // res.sendFile('muscles.html', {root: VIEWS});
    
    let sql = 'SELECT * FROM asanas'
    let query = db.query(sql, (err, res2) => {
    if(err) throw err;
    console.log(res2);

    res.render('asanas.jade', {root: VIEWS,res2});
  });
    console.log('now you are on Muscles');
});

// we need to set the requirements for the application to run

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function(){
    console.log("integrateddance app is running");
    
});

app.get('/createtable', function(req,res){
  
  let sql = 'CREATE TABLE muscles (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Origin varchar(255), Insertion varchar(255), Action varchar (255), Comments varchar(255), Link varchar(255)) ;'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
});

app.get('/createasanastable', function(req,res){
  
  let sql = 'CREATE TABLE asanas (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Sanskrit varchar(255), Comments varchar(255),Link varchar(255)) ;'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
});



app.get('/insertasana2', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Upward-Facing Dog Pose","Urdhva Mukha Svanasana", "", "https://www.yogajournal.com/poses/upward-facing-dog");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});


app.get('/insertasana3', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Warrior I","Virabhadrasana I", "", "https://www.yogajournal.com/poses/warrior-i-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana4', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Warrior II","Virabhadrasana II", "", "https://www.yogajournal.com/poses/warrior-ii-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});
app.get('/insertasana5', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Warrior III","Virabhadrasana III", "", "https://www.yogajournal.com/poses/warrior-iii-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana6', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Bow Pose","Dhanurasana", "", "https://www.yogajournal.com/poses/bow-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana7', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Camel Pose","Ustrasana", "", "https://www.yogajournal.com/poses/camel-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana8', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Camel Pose","Ustrasana", "", "https://www.yogajournal.com/poses/camel-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana9', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Chair Pose","Utkatasana", "", "https://www.yogajournal.com/poses/chair-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana10', function(req,res){
    
  
  let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Cobra Pose","Bhujangasana", "", "https://www.yogajournal.com/poses/cobra-pose");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});


app.get('/insert', function(req,res){
    
  
  let sql = 'INSERT INTO muscles(Name,Origin,Insertion,Action,Comments,Link)VALUES("Diaphragm","xiphoid process, the inner surface of the lower six costal cartilages and the L1 through the L3 lumbar vertebrae.","central aponeurotic tendon","Inspiration and forced inspiration","","https://www.youtube.com/watch?v=TVG8tWyaisc");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insert2', function(req,res){
    
  
  let sql = 'INSERT INTO muscles(Name,Origin,Insertion,Action,Comments,Link)VALUES("Transversus Abdominis","inner surface of the 7th to 12th costal cartilages, the thoracolumbar fascia, the iliac crest horizontally, and the inguinal ligament","linea alba","Supports abdominal wall, aids forced expiration and raising intra-abdominal pressure. Conjoint tendon supports posterior wall of inguinal canal","","https://www.youtube.com/watch?v=RFiyGkXaKZ4");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });

  res.send("items created..... thanks Isabelle!!");
});

app.get('/insert6', function(req,res){
    
  
  let sql = 'INSERT INTO muscles(Name,Origin,Insertion,Action,Comments,Link)VALUES("Splenius Capitis","lower half of the nuchal ligament and spinous processes of the 7th cervical vertebra and first three thoracic vertebrae","mastoid process of the temporal bone","The muscle acts as a shaker of the head, it causes neck extension and lateral flexion. ");'
    
  
  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
      
  
 
    
 });
 
app.get('/insert4', function(req,res){
    
  
  let sql = 'INSERT INTO muscles(Name,Origin,Insertion,Action,Comments,Link)VALUES("Internal Oblique Abdominis","Lumbar fascia, anterior two-thirds of the iliac crest, and the lateral two-thirds of the inguinal ligament","Costal margin, aponeurosis of the rectus sheath, conjoined tendon to the pubic crest and pectineal line, 10-12 rib","Unilaterally assists in lateral flexion and rotation of the spine. Bilaterally flexes the spine.","","https://www.youtube.com/watch?v=IoDT3b4BeY4");'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

app.get('/insert5', function(req,res){
    
  
  let sql = 'INSERT INTO muscles(Name,Origin,Insertion,Action,Comments,Link)VALUES("External Oblique Abdominis","Angle of the 9th rib, blending with serratus anterior and from the angles of the 10th, 11th, and 12th ribs, blending with latissimus dorsi","Outer anterior half of the iliac crest, the inguinal ligament, the pubic tubercle and crest, and the aponeurosis of the anterior rectus sheath","Unilaterally assists in lateral flexion and rotation of the spine. Bilaterally flexes the spine.","","https://www.youtube.com/watch?v=hk3zzKS8Hwc");' 
  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items created..... thanks Isabelle!!");
});

  


//query
app.get('/querymuscles', function(req,res){
  
  let sql = 'SELECT * FROM muscles;'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items read, look at console..... thanks Isabelle!!");
});

//query
app.get('/queryasanas', function(req,res){
  
  let sql = 'SELECT * FROM asanas;'

  
  let query = db.query(sql,(err,res) =>{
    if (err) throw err;
    console.log(res);
    
 });
  res.send("items read, look at console..... thanks Isabelle!!");
});

app.get('/muscle/:id', function(req, res){ // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered  
  
    let sql = "SELECT * FROM muscles WHERE Id = 2; "
    let query = db.query(sql, (err,res1)=>{
    if (err)throw (err);
    res.render('item', {root: VIEWS, res1});
    
  });
   //use render so that response objst renders html
  console.log("Now you are on the item page!");
});//
