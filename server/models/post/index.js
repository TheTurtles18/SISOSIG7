var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Unit Test
mongoose.Promise = global.Promise;

/* I think this schema makes more sense for us
var PostSchema = new Schema ({
    user: String,
    caption: String,
    shave_votes: Number,
    grow_votes: Number
    // Some way to reference image
});*/

var PostSchema = new Schema({
    img: { data: Buffer, contentType: String },
    createdAt: {type: Date, default: Date.now},
    shaves: Number,
    grows: Number
});


// var  photoSchema = new Schema({

//     path:  { type: String },
  
//     caption: { type: String }
//     });

// this is a start to the schema we'll be developing, 
// but it's commented out for now so that we can test the example postschema version


module.exports = mongoose.model('Posts', PostSchema);
//module.exports = mongoose.model("Photos", photoSchema);