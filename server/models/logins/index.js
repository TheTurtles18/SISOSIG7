var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// this is a start to the schema we'll be developing, 
// but it's commented out for now so that we can test the example postschema version

var UserSchema = new Schema({
    First: String, 
    Last: String,
    Username: String, 
    Password: String,
    Email: String,
    FbId: Number

});


//Change second argument to the UserSchema or PostSchema depending on which you want 

module.exports = mongoose.model("Person", UserSchema);