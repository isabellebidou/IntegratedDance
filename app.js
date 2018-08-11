var express = require("express"); // call expresss to be used by application
var app = express();

var behaviour = require('./behaviour.js');

var session = require('express-session');
app.set('view engine', 'jade');
//var newId;
var mysql = require('mysql');
var bodyParser = require('body-parser');


const path = require('path');
const VIEWS = path.join(__dirname, 'views');

var fs = require("fs");
app.use(session({ secret: "topsecret" })); // Requird to make the session accessable throughouty the application
app.use(express.static("scripts"));
app.use(express.static("images"));
app.use(express.static("models"));
var questions = require("./models/questions.json");
app.use(bodyParser.urlencoded({ extended: true }));


const db = mysql.createConnection({
    host: 'isabellebidou.com',
    user: 'isabelle_isabelle',
    password: 'Thelion71',
    database: 'isabelle_db',
    port: 3306
});
db.connect((err) => {
    if (err) {

        throw (err)
    }
    else {
        console.log("db connected!");

    }
});


//home page
app.get('/', function(req, res) {
    res.render('index', { root: VIEWS });
    console.log('now you are home');
    console.log('the status of this user is : ' + req.session.email);
});


//muscles page
app.get('/muscles', function(req, res) {

    let sql = 'SELECT * FROM muscles'
    let query = db.query(sql, (err, res1) => {
        if (err) throw err;
        console.log(res1);

        res.render('muscles.jade', { root: VIEWS, res1 });
    });
    console.log('now you are on Muscles');
});

//createmuscle page
app.get('/createmuscle', function(req, res) {
    if (req.session.email == "LoggedIn") {
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('createmuscle', { root: VIEWS });
        console.log('now you ready to create a muscle');
    }
    else {
        res.redirect('/login');
    }
});

//add entry to muscle table on post on button press
app.post('/createmuscle', function(req, res) {

    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES ("' + req.body.name + '","' + req.body.origin + '","' + req.body.insertion + '","' + req.body.action + '","' + req.body.image + '","' + req.body.comments + '","' + req.body.link + '");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;

    });

    res.render('index', { root: VIEWS });



});

//edit data of  muscle table entry on post on button press
app.get('/editmuscle/:id', function(req, res) {
    let sql = 'SELECT * FROM muscles WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('editmuscle', { root: VIEWS, res1 });
    });
});

app.post('/editmuscle/:id', function(req, res) {
    if (req.session.email == "LoggedIn") {
        let sql = 'UPDATE muscles SET Name= "' + req.body.newname + '" , Origin = "' + req.body.neworigin + '", Insertion = "' + req.body.newinsertion + '", Action = "' + req.body.newaction + '",Image = "' + req.body.newimage + '", Comments = "' + req.body.newcomments + '", Link = "' + req.body.newlink + '" WHERE Id = "' + req.params.id + '" ;'

        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            console.log(res1);
        });
        res.redirect(/muscle/ + req.params.id);
    }
    else {
        res.redirect('/login');
    }
});


app.get('/deletemuscle/:id', function(req, res) {
    if (req.session.email == "LoggedIn") {
        let sql = 'DELETE FROM muscles WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/muscles');
        });
    }
    else {
        res.redirect('/login');
    }
});


//asanas page
app.get('/asanas', function(req, res) {

    console.log("logedIn ? " + req.session.email);
    let sql = 'SELECT * FROM asanas'
    let query = db.query(sql, (err, res2) => {
        if (err) throw err;
        //console.log(res2);

        res.render('asanas.jade', { root: VIEWS, res2 });
    });
    console.log('now you are on asanas');
});

app.get('/createasana', function(req, res) {
    if (req.session.email == "LoggedIn") {

        res.render('createasana', { root: VIEWS });
        console.log('now you ready to create an asana');
    }
    else {
        res.redirect('/login');
    }
});

//add data to asana table on post on button press
app.post('/createasana', function(req, res) {
    let sql = 'INSERT INTO asanas (Name,Sanskrit,Comments,Link) VALUES ("' + req.body.englishname + '","' + req.body.sanskritname + '","' + req.body.comments + '","' + req.body.link + '");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;
        // 
    });

    res.render('index', { root: VIEWS });

});

//edit data of  asanas table entry on post on button press
app.get('/editasana/:id', function(req, res) {

    if (req.session.email == "LoggedIn") {


        let sql = 'SELECT * FROM asanas WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.render('editasana', { root: VIEWS, res1 });
        });
    }
    else {
        res.redirect('/login');
    }

});

app.post('/editasana/:id', function(req, res) {
    let sql = 'UPDATE asanas SET Name= "' + req.body.newenglishname + '" , Sanskrit = "' + req.body.newsanskritname + '", Comments = "' + req.body.newcomments + '", Link = "' + req.body.newlink + '"   WHERE Id = "' + req.params.id + '"; '


    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        // 
    });
    res.redirect(/asana/ + req.params.id);
});

app.get('/deleteasana/:id', function(req, res) {
    if (req.session.email == "LoggedIn") {
        let sql = 'DELETE FROM asanas WHERE Id = "' + req.params.id + '"; '
        let query = db.query(sql, (err, res1) => {
            if (err) throw (err);
            res.redirect('/asanas');
        });

    }
    else {
        res.redirect('/login');
    }
});


app.get('/dropmusclestable', function(req, res) {

    let sql = 'DROP TABLE muscles;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;
        // 

    });
});

app.get('/createmusclestable', function(req, res) {

    let sql = 'CREATE TABLE muscles (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Origin varchar(255), Insertion varchar(255), Action varchar (255), Image varchar(255), Comments varchar(255), Link varchar(255)) ;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

app.get('/createasanastable', function(req, res) {

    let sql = 'CREATE TABLE asanas (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Sanskrit varchar(255), Comments varchar(255),Link varchar(255)) ;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;
        // 

    });
});



app.get('/insertasana2', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Upward-Facing Dog Pose","Urdhva Mukha Svanasana", "", "https://www.yogajournal.com/poses/upward-facing-dog");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});


app.get('/insertasana3', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Warrior I","Virabhadrasana I", "", "https://www.yogajournal.com/poses/warrior-i-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;
        // 

    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana4', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Warrior II","Virabhadrasana II", "", "https://www.yogajournal.com/poses/warrior-ii-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;
        // 

    });
    res.send("items created..... thanks Isabelle!!");
});
app.get('/insertasana5', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Warrior III","Virabhadrasana III", "", "https://www.yogajournal.com/poses/warrior-iii-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana6', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Bow Pose","Dhanurasana", "", "https://www.yogajournal.com/poses/bow-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana7', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Camel Pose","Ustrasana", "", "https://www.yogajournal.com/poses/camel-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana8', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Camel Pose","Ustrasana", "", "https://www.yogajournal.com/poses/camel-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana9', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Chair Pose","Utkatasana", "", "https://www.yogajournal.com/poses/chair-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertasana10', function(req, res) {


    let sql = 'INSERT INTO asanas(Name,Sanskrit,Comments,Link)VALUES("Cobra Pose","Bhujangasana", "", "https://www.yogajournal.com/poses/cobra-pose");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});


app.get('/insertmuscle', function(req, res) {


    let sql = 'INSERT INTO muscles(Name,Origin,Insertion,Action,Image,Comments,Link)VALUES("Rectus Abdominis","Pubic crest and pubic symphysis","5, 6, 7 costal cartilages, medial inferiorcostal margin and posterior aspect of xiphoid","Flexes trunk, aids forced expiration and raise intra-abdominal pressure","https://upload.wikimedia.org/wikipedia/commons/9/95/Rectus_abdominis.png","CC BY-SA 3.0, https://commons.wikimedia.org/w/index.php?curid=238610","https://www.youtube.com/watch?v=dbwDle81JzM");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("item created..... thanks Isabelle!!");
});

app.get('/insertmuscle2', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("External Oblique Abdominis","Angle of the 9th rib, blending with serratus anterior and from the angles of the 10th, 11th, and 12th ribs, blending with latissimus dorsi","Outer anterior half of the iliac crest, the inguinal ligament, the pubic tubercle and crest, and the aponeurosis of the anterior rectus sheath","Unilaterally assists in lateral flexion and rotation of the spine. Bilaterally flexes the spine.","https://upload.wikimedia.org/wikipedia/commons/e/e8/Gray392.png","By Henry Vandyke Carter - Henry Gray (1918) Anatomy of the Human Body","https://www.youtube.com/watch?v=hk3zzKS8Hwc");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });

    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle3', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Internal Oblique Abdominis","Lumbar fascia, anterior two-thirds of the iliac crest, and the lateral two-thirds of the inguinal ligament","Costal margin, aponeurosis of the rectus sheath, conjoined tendon to the pubic crest and pectineal line, 10-12 rib","Unilaterally assists in lateral flexion and rotation of the spine. Bilaterally flexes the spine.","https://upload.wikimedia.org/wikipedia/commons/2/2a/Gray395.png","Henry Gray (1918) Anatomy of the Human Body","https://www.youtube.com/watch?v=IoDT3b4BeY4");'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });




});

app.get('/insertmuscle4', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Splenius Capitis","lower half of the nuchal ligament and spinous processes of the 7th cervical vertebra and first three thoracic vertebrae","mastoid process of the temporal bone","The muscle acts as a shaker of the head, it causes neck extension and lateral flexion. ","https://upload.wikimedia.org/wikipedia/commons/5/5f/Musculus_splenius_capitis_marked.png","By modified by Uwe Gille - Gray Image:Gray409.png, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2510793","https://www.youtube.com/watch?v=IOew5w_veTw");'

    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle5', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Transversus Abdominis","inner surface of the 7th to 12th costal cartilages, the thoracolumbar fascia, the iliac crest horizontally, and the inguinal ligament","linea alba","Supports abdominal wall, aids forced expiration and raising intra-abdominal pressure. Conjoint tendon supports posterior wall of inguinal canal","https://upload.wikimedia.org/wikipedia/commons/d/d5/Transversus_abdominis.png","By modified by Uwe Gille - Gray397.png, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2601348","https://www.youtube.com/watch?v=RFiyGkXaKZ4");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle6', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Diaphragm","xiphoid process, the inner surface of the lower six costal cartilages and the L1 through the L3 lumbar vertebrae.","central aponeurotic tendon","Inspiration and forced inspiration","https://upload.wikimedia.org/wikipedia/commons/7/70/1113_The_Diaphragm.jpg","By OpenStax - https://cnx.org/contents/FPtK1zmh@8.25:fEI3C8Ot@10/Preface, CC BY 4.0, https://commons.wikimedia.org/w/index.php?curid=30131686","https://www.youtube.com/watch?v=TVG8tWyaisc");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});
app.get('/insertmuscle7', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Psoas major","1st to 4rd lumbar vertebrae, the costal processes of all lumbar vertebrae and the 12th thoracic vertebrae","femur","Flexion of thigh at hip, assists in extension of the lumbar spine","https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Psoas_major_muscle11.png/1920px-Psoas_major_muscle11.png","By Anatomography - en:Anatomography (setting page of this image), CC BY-SA 2.1 jp, https://commons.wikimedia.org/w/index.php?curid=27639336","https://www.youtube.com/watch?v=RLNXAs4vWkE");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle8', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Iliacus"," Iliac fossa within abdomen","femur","Flexion of thigh at hip, assists in extension of the lumbar spine","https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Iliacus_muscle06.png/1920px-Iliacus_muscle06.png","By Anatomography - en:Anatomography (setting page of this image), CC BY-SA 2.1 jp, https://commons.wikimedia.org/w/index.php?curid=27547545","https://www.youtube.com/watch?v=dbwDle81JzM");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle9', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("levator scapulae","transverse process of cervical vertebrae one to four","scapula","Raises medial border of scapula","https://upload.wikimedia.org/wikipedia/commons/b/bc/Levator_scapulae.png","By modified by Uwe Gille - Gray Image:Gray409.png, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2510847","https://www.youtube.com/watch?v=bpkyIHeVesI");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle10', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("latissimus dorsi","Spinous processes of thoracic T7-T12, 9th to 12th ribs, the lumbar and sacral vertebrae (via the thoracolumbar fascia), and the posterior third of the external lip of the iliac crest","humerus","Adducts, extends and internally rotates the arm at the shoulder","https://upload.wikimedia.org/wikipedia/commons/6/6f/Latissimus_dorsi.PNG","By User:Mikael Häggström - Image:Gray409.png, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2892603","https://www.youtube.com/watch?v=FGeJWRIzqDI");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});

app.get('/insertmuscle11', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("Rectus femoris","anterior inferior iliac spine and the exterior surface of the bony ridge which forms the groove on the iliac portion of the acetabulum","patellar tendon","Extension of the leg at the knee","https://upload.wikimedia.org/wikipedia/commons/1/14/Rectus_femoris.png","By modified by Uwe Gille - Gray430.png, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2825447","https://www.youtube.com/watch?v=1Av_KKvCcVI");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});
app.get('/insertmuscle12', function(req, res) {


    let sql = 'INSERT INTO muscles (Name,Origin,Insertion,Action,Image,Comments,Link) VALUES("rhomboid","thoracic vertebrae T2 to T5, supraspinous ligament","medial border of the scapula","Extension of the leg at the knee","https://upload.wikimedia.org/wikipedia/commons/a/aa/Rhomboidei.PNG","By modified by Uwe Gille - Gray430.png, Public Domain, https://commons.wikimedia.org/w/index.php?curid=2825447","https://youtu.be/e_RvgWQj_DQ");'
    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items created..... thanks Isabelle!!");
});


//query
app.get('/querymuscles', function(req, res) {

    let sql = 'SELECT * FROM muscles;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items read, look at console..... thanks Isabelle!!");
});

//query
app.get('/queryasanas', function(req, res) {

    let sql = 'SELECT * FROM asanas;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
    res.send("items read, look at console..... thanks Isabelle!!");
});

app.get('/muscle/:id', function(req, res) { // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered  

    let sql = 'SELECT * FROM muscles WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('muscle', { root: VIEWS, res1 });

    });
    //use render so that response objst renders html
    console.log("Now you are on the muscle page!");
}); //

app.get('/asana/:id', function(req, res) { // res.send("Hello cruel world!"); // This is commented out to allow the index view to be rendered  

    let sql = 'SELECT * FROM asanas WHERE Id = "' + req.params.id + '"; '
    let query = db.query(sql, (err, res1) => {
        if (err) throw (err);
        res.render('asana', { root: VIEWS, res1 });

    });
    //use render so that response objst renders html
    console.log("Now you are on the asana page!");
});

//----------------------------------
//json manipulation
app.get('/addquestion', function(req, res) {

    if (req.session.email == "LoggedIn") {
        // res.sendFile('index.html', {root: VIEWS},behaviour);
        res.render('addquestion', { root: VIEWS });
        console.log('now you are on the quiz');
    }
    else {
        res.redirect('/login');
    }
});

app.get("/quiz", function(req, res) {

    res.render("quiz", { questions: questions });
    console.log("quiz");
});

app.post('/addquestion', function(req, res) {
    var count = Object.keys(questions).length; // Tells us how many products we have its not needed but is nice to show how we can do this
    console.log(count);

    // This will look for the current largest id in the questions JSON file this is only needed if you want the questions to have an auto ID which is a good idea 

    function getMax(questions, id) {
        var max
        for (var i = 0; i < questions.length; i++) {
            if (!max || parseInt(questions[i][id]) > parseInt(max[id]))
                max = questions[i];

        }
        return max;
    }

    var maxPpg = getMax(questions, "id"); // This calls the function above and passes the result as a variable called maxPpg.
    console.log(maxPpg);
    var newId = maxPpg.id + 1; // this creates a nwe variable called newID which is the max Id + 1
    console.log(newId); // We console log the new id for show reasons only

    // create a new product based on what we have in our form on the add page 

    var question = {
        question: req.body.question, // name called from the add.jade page textbox

        answer: req.body.answer, // content called from the add.jade page textbox
        id: newId, // this is the variable created above

    };
    console.log(question) // Console log the new product 
    var json = JSON.stringify(questions); // Convert from object to string

    // The following function reads the json file then pushes the data from the variable above to the questions JSON file. 
    fs.readFile('./models/questions.json', 'utf8', function readFileCallback(err, data) {
        if (err) {
            throw (err);
        }
        else {
            questions.push(question); // add the information from the above variable
            json = JSON.stringify(questions, null, 4); // converted back to JSON the 4 spaces the json file out so when we look at it it is easily read. So it indents it. 
            fs.writeFile('./models/questions.json', json, 'utf8'); // Write the file back

        }
    });
    res.redirect("/quiz")
});;









app.get('/editquestion/:id', function(req, res) {

    function chooseQuestion(indOne) {
        return indOne.id === parseInt(req.params.id)
    }



    console.log("id or question= " + req.params.id);
    console.log("editquestion");
    var indOne = questions.filter(chooseQuestion);

    res.render('editquestion', { indOne: indOne });
});


//post request to edit the individual question
app.post('/editquestion/:id', function(req, res) {

    var x = req.body.newquestion;
    var y = req.body.newanswer;
    var z = parseInt(req.params.id);

    questions.splice(z - 1, 1, { question: x, answer: y, id: z });
    var json = JSON.stringify(questions, null, 4);

    fs.writeFile('./models/questions.json', json, 'utf8');
    res.redirect("/quiz");

});

app.get("/deletequestion/:id", function(req, res) {
    if (req.session.email == "LoggedIn") {
        var z = parseInt(req.params.id);
        questions.splice(z - 1, 1);
        var json = JSON.stringify(questions, null, 4);
        recalibrate();
        fs.writeFile('./models/questions.json', json, 'utf8');

        res.redirect("/quiz");
    }
    else {
        res.redirect('/login');
    }

});
// this is used after you delete a question to keep numbers in order
function recalibrate() {

    var x = 0;
    for (x; x < questions.length; x++) {
        questions[x].id = x + 1;

    }
    var json = JSON.stringify(questions, null, 4);
    fs.writeFile('./models/questions.json', json, 'utf8');
}

// End JSON
//end of json manipulation


// function to render the muscles page
app.post('/searchmuscles', function(req, res) {
    //let sql = 'SELECT * FROM muscles WHERE Name LIKE "%'+req.body.search+'%" OR Origin LIKE "%'+req.body.search+'%" OR Insertion LIKE "%'+req.body.search+'%" OR Action LIKE "%'+req.body.search+'%";'
    let sql = 'SELECT * FROM muscles WHERE Name LIKE "%' + req.body.search + '%";'
    let query = db.query(sql, (err, res1) => {
        if (err)
            throw (err);

        res.render('muscles', { root: VIEWS, res1 }); // use the render command so that the response object renders a HHTML page
        console.log("searchmuscles");
    });

    console.log("Now you are on the products page!");
});

// function to render the asanas page
app.post('/searchasanas', function(req, res) {

    //let sql = 'SELECT * FROM muscles WHERE Name LIKE "%'+req.body.search+'%" OR Origin LIKE "%'+req.body.search+'%" OR Insertion LIKE "%'+req.body.search+'%" OR Action LIKE "%'+req.body.search+'%";'
    let sql = 'SELECT * FROM asanas WHERE Name LIKE "%' + req.body.search + '%";'
    let query = db.query(sql, (err, res2) => {
        if (err)
            throw (err);

        res.render('asanas', { root: VIEWS, res2 }); // use the render command so that the response object renders a HHTML page
        //console.log("I Set a Session as shown on asanas page" + req.session.email);
        console.log("searchasanas");
    });

    console.log("Now you are on the products page!");
});

///*********************************login logout
app.get('/createusertable', function(req, res) {

    let sql = 'CREATE TABLE integrateddanceeusers (Id int NOT NULL AUTO_INCREMENT PRIMARY KEY, Name varchar(255), Email varchar(255), Password varchar(255), Admin varchar(255)) ;'


    let query = db.query(sql, (err, res) => {
        if (err) throw err;


    });
});

// USE THE BELOW WITH CAUTION to delete the users table
// app.get('/dropcreateusertable', function(req,res){

//   let sql = 'DROP TABLE integrateddanceeusers ;'


//   let query = db.query(sql,(err,res) =>{
//     if (err) throw err;
//      

//  });
// });

app.get('/register', function(req, res) {
    res.render('register', { root: VIEWS });
});

app.post('/register', function(req, res) {

    db.query('INSERT INTO integrateddanceeusers(Name, Email, Password, Admin) VALUES("' + req.body.name + '","' + req.body.email + '","' + req.body.password + '","' + req.body.role + '")');

    req.session.email = "LoggedIn";
    // req.session.who = req.body.name;
    res.redirect('/');


});

app.get('/login', function(req, res) {
    res.render('login', { root: VIEWS });
});


app.post('/login', function(req, res) {
    var whichOne = req.body.name;
    var whichPass = req.body.password;

    let sql2 = 'SELECT name, password FROM integrateddanceeusers WHERE name= "' + whichOne + '"'
    let query = db.query(sql2, (err, res2) => {
        if (err) throw err;
        console.log(res2);

        var passx = res2[0].password;
        var passxn = res2[0].name;
        console.log("You logged in with " + passx + " and name " + passxn);


        if (passx == whichPass) {
            console.log("It Worked! Logged in with: " + passx + " , " + whichPass);
            req.session.email = "LoggedIn";
            res.redirect("/");

        }
        else { res.redirect("login"); }
        //res.render("index.jade");
        //res.render("showit.jade", {res1,res2});
    });

});


app.get('/logout', function(req, res) {
    res.render('index', { root: VIEWS });
    console.log("Now you loggedout!");
    req.session.destroy(session.email);
});

// we need to set the requirements for the application to run

app.listen(process.env.PORT || 3000, process.env.IP || '0.0.0.0', function() {
    console.log("integrateddance app is running");

});