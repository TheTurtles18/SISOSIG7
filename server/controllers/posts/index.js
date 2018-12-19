var base = process.env.PwD;
var Post = require('../../models/post');
var fs = require('fs');

var bodyParser = require('body-parser');
//var fs = require('fs');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var conn = mongoose.connection;
var path = require('path');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
var port = 3000;

var imagePath = path.join(__dirname, '../../uploads/beardPic.jpg');

Grid.mongo = mongoose.mongo;

/*
var gfs = Grid(conn.db);

var storage = GridFsStorage({
  gfs : gfs,

  filename: (req, file, cb) => {
      var date = Date.now();
      // The way you want to store your file in database
      cb(null, file.fieldname + '-' + date + '.'); 
  },
  
  // Additional Meta-data that you want to store
  metadata: function(req, file, cb) {
      cb(null, { originalname: file.originalname });
  },
  root: 'ctFiles' // Root collection name
});

var upload = multer({
  storage: storage
}).single('file');

var uploadPost = function (req, res){
    res.send("This worked");
    upload(req,res, (err) => {
      if(err){
           res.json({error_code:1,err_desc:err});
           return;
      }
      res.json({error_code:0, error_desc: null, file_uploaded: true});
    });
};
*/
var TESTies = 123523;
var uploadPost = function(req, res){
    var gfs = Grid(conn.db);
    console.log("FIND THE PATH");
    console.log(req);
    var writestream = gfs.createWriteStream({
        filename: 'beardPic.jpg',
        metadata: 123
    })
    
    fs.createReadStream(imagePath).pipe(writestream);

    writestream.on('close', function(file){
        res.send(file.metadata + 'Written to DB');
    })
    //Get request sending us back to timeline
};

var downloadPicture = function(req, res){
    var gfs = Grid(conn.db);

    var fs_write_stream = fs.createWriteStream(path.join(__dirname, '../../uploads/extractedBeardPic.jpg'));

    var readstream = gfs.createReadStream({
        filename: 'beardPic.jpg'
    });

    readstream.pipe(fs_write_stream);
    fs_write_stream.on('close', function(){

    });
}

var createPhoto = function (req, res) {
    var post = new Post(req.file);

    post.save(function (err, post){
        if(err) {res.send(500,err);}
        post.img.data = req.file
        post.img.contentType = 'image/png';
        res.send(post.path);
    });
    
};

var createPost = function (req, res) {
    var post = new Post(req.body);

    post.save(function (err, post){
        if(err) {res.send(500,err);}
        //post.img.data = req.body
        //post.img.contentType = 'image/png';
        res.send(post.path);
    });
};

var getPosts = function(req, res) {
    Post.find(function (err, posts) {
        if(err) {res.send(500,err);}
        res.json(200, posts);
    })
};

var getPost = function(req, res){
    Post.findById(req.params.id, function(err, post) {
        if(err) {res.send(500, err);}
        res.json(200, post);
    });
};


module.exports = {
    createPost,
    getPosts,
    getPost,
    uploadPost,
    downloadPicture

}