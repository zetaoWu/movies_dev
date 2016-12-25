var Movie = require('../models/movie.js');
var Category = require('../models/category');
/* GET home page. 
    "/"  */
exports.index = function (req, res, next) {
    Category.find({}).populate({ path: 'movies', options: { limit: 5 } })
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


