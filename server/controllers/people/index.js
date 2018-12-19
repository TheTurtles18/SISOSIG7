var base = process.env.PwD;
var Person = require('../../models/logins');
//var data = require('../../controller')


var body = 
		{
			
			
		}
		

var createPerson = function (req, res) {
    console.log("Creating a person");
    console.log(req.body);
    var person = new Person(req.body);
    console.log(person);
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


var getPerson = function(req, res) {
    Person.findById(req.params.id, function(err, person){
        if(err) {res.send(500, err);}
        res.json(200, person);
    });
}

var findPerson = function(req, res){
    console.log("Finding a person");
    Person.findOne({FbId: req.params.id}, function(err, person){
        console.log("looking for a person");
        if(err){res.send(500, err);}
        res.json(200, person);
    });
}

var updatePerson = function(req, res){

    Person.findById(req.params.id, function(err, person){
        if(err) {res.send(500, err);}
        if(req.body.First){ person.First = req.body.First }
        if(req.body.Last){ person.Last = req.body.Last }
        if(req.body.Username){ person.Username = req.body.Username }
        if(req.body.Password){ person.Password = req.body.Password }
        if(req.body.Email){ person.Email = req.body.Email }
        if(req.body.FbId){ person.FbId = req.body.FbId }
        person.save(function(err, person){
            if(err) {res.send(500, err);}
            res.json(200, person);
        })

    })
};




module.exports = {
    createPerson,
    getPeople,
    getPerson, 
    findPerson, 
    updatePerson
}