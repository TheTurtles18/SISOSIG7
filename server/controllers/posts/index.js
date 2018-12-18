var base = process.env.PwD;
var Post = require('../../models/post');

var createPost = function (req, res) {
    var post = new Post(req.body);

    post.save(function (err, post){
        if(err) {res.send(500,err);}
        res.json(200, post);
    });
    
};

var getPosts = function(req, res) {
    Post.find(function (err, posts) {
        if(err) {res.send(500,err);}
        res.json(200, posts);
    })
    console.log("We got the request guy!");
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

        if(req.body.title) {post.title = req.body.title;}

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
    updatePost

}