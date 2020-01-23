var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser')

//this code sets up template engine as express handlebars
app.engine('handlebars', exphbs({defaultLayout:'main'}));
app.set('view engine', 'handlebars');

// create application/json parser
app.use(bodyParser.json());
 // create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));

//get route using express handlebars
app.get('/', function(req, res){
    var title = "Welcome to the Game Library App"
    res.render('index',{
        title:title
    });
});

app.get('/about', function(req, res){
    res.render('about');
});

app.get('/gameentry/gameentryadd', function(req, res){
    res.render('gameentry/gameentryadd');
});

//Post Requests
app.post('/gameentry',function(req,res){
    console.log(req.body);
    res.send(req.body);
});

app.listen(5000, function(){
    console.log("Game Library running on port 5000");
});