var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Unit Test
mongoose.Promise = global.Promise;

var PostSchema = new Schema ({
    userId: String,
    user_firstname: String,
    caption: String,
    photoId: String,
    createdAt: {type: Date, default: Date.now()},
    shave_votes: {type: Number, default: 0},
    grow_votes: {type: Number, default: 0},
    imageId: String
});

// var  photoSchema = new Schema({

//     path:  { type: String },
  
//     caption: { type: String }
//     });

// this is a start to the schema we'll be developing, 
// but it's commented out for now so that we can test the example postschema version


module.exports = mongoose.model('Posts', PostSchema);
//module.exports = mongoose.model("Photos", photoSchema);