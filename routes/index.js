var express = require('express');
var router = express.Router();
//const data = require('../controller');

var base = process.env.PwD;
var posts = require('../controllers/posts');
var people = require('../controllers/people');

router.get('/posts', posts.getPosts);
router.get('/post/:id', posts.getPost);
router.put('/post/:id', posts.updatePost);
router.post('/post/create', posts.createPost);


router.post('/login', people.createPerson);
 
router.get('/users', people.getPeople);


/* GET home page. */
   router.get('/', function(req, res, next) {
     res.render('login/index');
   });

   router.get('/timeline', function(req, res, next){
     res.render('timeline');
   })


module.exports = router;