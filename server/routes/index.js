var express = require('express');
var router = express.Router();

var multer = require('multer');
var upload = multer({dest: 'uploads/'});

//const data = require('../controller');

var base = process.env.PwD;
var posts = require('../controllers/posts');
var people = require('../controllers/people');

router.get('/posts', posts.getPosts);
router.get('/post/:id', posts.getPost);
router.post('/post/create', posts.createPost);
<<<<<<< HEAD
router.put('/post/:id', posts.updatePost);
=======

router.get('/fblogged/:id', people.findPerson);
>>>>>>> 1f58026ac30d3ce6c3b395899c98dae5a7b1fc4c

router.post('/login', people.createPerson);
router.get('/u/:id', people.getPerson);

router.get('/userprofile', function(req, res){
  res.render('userprofile/index');
});


var Product = require('../models/product');
//POSTING A PITCURE 
router.post('/p', upload.single(), function(req, res){
  console.log(req.file.path);
  res.send(req.file);
});


router.get('/testImage', function(req, res){
  res.render('imageTest/index');
});

/* GET home page. */
   router.get('/', function(req, res, next) {
     res.render('login/index');
   });

   // Get Timeline Pa'ge
   router.get('/timeline', function(req, res){
    res.render('timeline');
  })

  router.get('/publish', function(req, res){
    res.render('publish/index');
  })



var body = {}

router.get('/user', function(req, res, next) {
  console.log("WHAT THE FUCK IS HAPPENING");  
  //console.log(req.query.first);
  console.log("DID THIS WORK");
  // Get Input data from form
  body = {
  First: req.query.first, 
  Last: req.query.last,
  Username: req.query.username, 
  Password: req.query.password,
  Email: req.query.email
  };
  console.log("THIS IS THE BODY");
  console.log(body);
  // Set body of request to info of 
  req.body = body;

  people.createPerson(req, res);

  

});


module.exports = router;