var base = process.env.PwD;
var Person = require('../../models/logins');
//var data = require('../../controller')


var body = 
		{
			
			
		}
		

var createPerson = function (req, res) {
    console.log("Creating a person");
    var person = new Person(req.body);

    person.save(function (err, person){
        if(err) {res.send(500,err);}
        res.json(200, person);
    }); 
};

var getPeople = function(req, res) {
    Person.find(function (err, people) {
        if(err) {res.send(500,err);}
        res.json(200, people);
    })
};



module.exports = {
    createPerson,
    getPeople

}