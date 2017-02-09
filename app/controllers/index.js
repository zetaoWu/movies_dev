var Movie = require('../models/movie.js');
var Category = require('../models/category');
/* GET home page. 
    "/"  */
exports.index = function (req, res, next) {
    Category
        .find({})
        .populate({
            path: 'movies',
            select: 'title poster',
            options: { limit: 5 }
        })
        .exec(function (err, categories) {
            if (err) {
                console.log(err);
            }
            res.render('index', {
                title: '首页',
                categories: categories,
            })
        });
}

exports.search = function (req, res, next) {
    var catId = req.query.cat;
    var q = req.query.q;
    var page = parseInt(req.query.p, 10) || 0; //10进制
    var count = 2;
    var index = page * count;
    //判断搜索的是分类还是电影
    if (catId) {
        Category.find({ _id: catId })
            .populate({
                path: 'movies',
                select: 'title poster',
            })
            .exec(function (err, categories) {
                if (err) {
                    console.log(err);
                }
                var category = categories[0] || {}
                var movies = category.movies || []
                 var results = movies.slice(index, index + count)
                    res.render('results', {
                        title: '搜索到',
                        keyword: category.name,
                        currentPage: (page + 1),
                        query: 'cat=' + catId,
                        totalPage: Math.ceil(movies.length / count),//向上取正
                        movies: results,
                    })
            });
    } else {
        Movie
            .find({ title: new RegExp(q + '.*', 'i') },
             function (err, movies) {
                if (err) {
                    console.log(err);
                }
                var results = movies.slice(index, index + count)

                res.render('results', {
                    title: '搜索到',
                    keyword: q,
                    currentPage: (page + 1),
                    query: 'q=' + q,
                    totalPage: Math.ceil(movies.length / count),
                    movies: results,
                })
            });
    }
}




