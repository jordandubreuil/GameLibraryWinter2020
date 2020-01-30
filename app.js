var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var methodOverride = require('method-override')
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to mongoose
mongoose.connect('mongodb://localhost:27017/gamelibrary',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(function(){
    console.log('mongodb connected');
}).catch(function(err){
    console.log(err);
});

//load game model
require('./models/Game');
var Game = mongoose.model('games');

//require method override
app.use(methodOverride('_method'));

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

app.get('/games', function(req, res){
    Game.find({}).then(function(games){
        console.log("Fetch Route ");
        console.log(games);
        res.render('gameentry/index',{
            games:games
        });
    });
    
});

app.get('/gameentry/gameentryadd', function(req, res){
    res.render('gameentry/gameentryadd');
});

app.get('/gameentry/gameentryedit/:id', function(req, res){
    Game.findOne({
        _id:req.params.id
    }).then(function(game){
        res.render('gameentry/gameentryedit',{
            game:game
        });
    })
});

//Post Requests
app.post('/gameentry',function(req,res){
    console.log(req.body);
    var errors = [];

    if(!req.body.title){
        errors.push({text:'please add a title'});
    }
    if(!req.body.price){
        errors.push({text:'please add a price'});
    }
    if(!req.body.description){
        errors.push({text:'please add a description'});
    }

    if(errors.length > 0){
        res.render('gameentry/gameentryadd',{
            errors:errors,
            title:req.body.title,
            price:req.body.price,
            description:req.body.description
        });
    }
    else{
        //Send info to database
       // res.send(req.body);
       var newUser = {
            title:req.body.title,
            price:req.body.price,
            description:req.body.description
       }
        new Game(newUser).save().then(function(games){
           
           res.redirect('/games');
       });
    }


    //res.send(req.body);
});

app.put('/gameedit/:id', function(req,res){
    Game.findOne({
        _id:req.params.id
    }).then(function(game){
        game.title = req.body.title
        game.price = req.body.price
        game.description = req.body.description

        game.save().then(function(game){
            res.redirect('/games');
        });

    });
});

app.listen(5000, function(){
    console.log("Game Library running on port 5000");
});