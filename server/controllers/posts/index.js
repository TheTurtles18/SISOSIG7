var base = process.env.PwD;
var Post = require('../../models/post');
var fs = require('fs');

var createPost = function (req, res) {
    var post = new Post(req.file);

    post.save(function (err, post){
        if(err) {res.send(500,err);}
        post.img.data = req.file
        post.img.contentType = 'image/png';
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
    getPost

}