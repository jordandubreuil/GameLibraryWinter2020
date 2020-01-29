var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new Schema({
    title:{
        title:String
    },
    price:{
        price:Number
    },
    description:{
        description:String
    }
});

mongoose.model('games', GameSchema);

