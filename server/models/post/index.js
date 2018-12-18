var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Unit Test
mongoose.Promise = global.Promise;

var PostSchema = new Schema ({
    user: String,
    caption: String,
    createdAt: {type: Date, default: Date.now()},
    shave_votes: {type: Number, default: 0},
    grow_votes: {type: Number, default: 0}
    // Some way to reference image
});

// this is a start to the schema we'll be developing, 
// but it's commented out for now so that we can test the example postschema version


module.exports = mongoose.model('Posts', PostSchema);