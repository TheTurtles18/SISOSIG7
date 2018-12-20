var express = require('express');
var router = express.Router();

var base = process.env.PwD;
var posts = require('../controllers/posts');
var people = require('../controllers/people');

router.post('/upload', posts.upload.single('file'), posts.uploadPost);
router.get('/images/:metadata', posts.getPicture);


router.get('/posts', posts.getPosts);
router.get('/post/:id', posts.getPost);
router.post('/post/create', posts.createPost);
router.put('/post/:id', posts.updatePost);

router.get('/fblogged/:id', people.findPerson);

router.post('/login', people.createPerson);
router.get('/u/:id', people.getPerson);
router.put('/updater/:id', people.updatePerson);

router.get('/userprofile', function(req, res){
  res.render('userprofile/index');
});


var Product = require('../models/product');


router.get('/testImage', function(req, res){
  res.render('imageTest/index');
});

/* GET home page. */
   router.get('/', function(req, res, next) {
     res.render('login/index');
   });

   // Get Timeline Page
   router.get('/timeline', function(req, res){
    res.render('timeline');
  })

  router.get('/publish', function(req, res){
    res.render('publish/index');
  })



var body = {}

router.post('/newUser', people.createPerson);

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