var base = process.env.PwD;
var Post = require('../../models/post');
var fs = require('fs');
var Cookies = require('js-cookie');

var app = require('../../app.js');
var path = require('path');
var crypto = require('crypto');
var mongoose = require('mongoose');
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');



//Mongo URI
var mongoURI = 'mongodb://localhost:27017/mean_app_db';

//var conn = mongoose.createConnection(mongoURI);
var conn = mongoose.connection;
//Grid.mongo = mongoose.mongo;



//init stream
var gfs;

conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('uploads');  //<- specifies name of collection, would replace 'fs' in fs.files and fs.chunks
})

//create storage engine


var storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'uploads',
            metadata: req.cookies.cookieKevin
          };
          resolve(fileInfo);
        });
      });
    }
  });
  const upload = multer({ storage });


var uploadPost = function (req, res){
    upload.single('file');
//    res.json({file: req.file});
    res.redirect('/api/timeline');
}

var getPicture = function (req, res){
    console.log("TESTHERE");
    gfs.files.findOne({ metadata: req.params.metadata }, (err, file) => {
        if (!file || file.length === 0){
            return res.status(404).json({
                err: 'No File Exists'
            });
        }
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
            const readstream = gfs.createReadStream(file.filename);
            readstream.pipe(res);
        } else {
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
}

// var getPicName = function(req, res){
//     gfs.files.findOne({ metadata: req.params.metadata }, (err, file) => {
//         if (file.contentType === 'image/jpeg' || file.contentType === 'image/png'){
//             const readstream = gfs.createReadStream(file.filename);
//             readstream.pipe(res);
//         }
//     }) 
// }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

var updatePost = function(req, res){

    Post.findById(req.params.id, function(err, post){
        if(err) {res.send(500, err);}
        if (req.query.type == 'shave') {
            post.shave_votes += 1;
        } else {
            post.grow_votes += 1;
        }
        post.save(function(err, post){
            if(err) {res.send(500, err);}
            res.json(200, post);
        })

    })
};


module.exports = {
    createPost,
    getPosts,
    getPost,
    updatePost,
    uploadPost,
    upload,
    getPicture 
    
}