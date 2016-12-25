var _ = require('underscore');
var Category = require("../models/Category.js");
var Movie = require('../models/movie.js');
var Comment = require('../models/Comment.js');

//detail page
exports.detail = function (req, res) {
    var id = req.params.id;

    Movie.findById(id, function (err, movie) {
        if (err) {
            console.log(err);
        }
        Comment.find({ movie: id })
            .populate('from', 'name')
            .populate('reply.from reply.to', 'name')
            .exec(function (err, comments) {
                console.log("123-------" + comments)
                if (err) {
                    console.log(err);
                }
                res.render('detail', {
                    title: '详情页',
                    movie: movie,
                    comments: comments
                })
            });
    });
}


//admin page
exports.new = function (req, res) {
    Category.find({}, function (err, categories) {
        res.render('admin', {
            title: '后台录入页',
            categories:categories,
            movie: {}
        })
    });
}

　//更新
exports.update = function (req, res) {
    var id = req.params.id;
    if (id) {
        Movie.findById(id, function (err, movie) {
            res.render('admin', {
                title: '后台更新页',
                movie: movie
            });
        })
    }
};

exports.save = function (req, res) {
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    console.log('-1122-'+movieObj.category);
    if (id) {
        //存在
        Movie.findById(id, function (err, movie) {
            if (err) {
                console.log(err);
            }
            //引入underScore 新字段替换老字段。
            _movie = _.extend(movie, movieObj);
            _movie.save(function (err, movie) {
                if (err) {z
                    console.log(err);
                }
                res.redirect('/movie/' + movie._id);
            })
        });
    } else {
        //不存在
        _movie = new Movie(movieObj);
        var categoryId=_movie.category;
        _movie.save(function (err, movie) {
            if (err) {
                console.log('333'+err);
            }
            Category.findById(categoryId,function(err,category){
                category.movies.push(movie._id);
                category.save(function(err,category){
                    res.redirect('/movie/' + movie._id);
                });
            });            
        });
    }
};

//list page
exports.list = function (req, res) {
    Movie.fetch(function (err, movies) {
        if (err) {
            console.log(err);
        }
        res.render('list', {
            title: '电影列表',
            movies: movies
        })
    })
};

//删除
exports.del = function (req, res) {
    var id = req.query.id;
    if (id) {
        Movie.remove({ _id: id }, function (err, movie) {
            if (err) {
                console.log(err);
            }
            else {
                res.json({ success: 1 });
            }
        });
    }
};
