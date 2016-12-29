var Category = require('../models/category');
var _ = require('underscore');

exports.new = function (req, res) {
    res.render('category_admin', {
        titel: '后台分类录入页',
        category:{
        }
    });
}

exports.save = function (req, res) {
    var _category=req.body.category;
    var categoty=new Category(_category);
    categoty.save(function(err,category){
        if(err){
            console.log(err);
        }
        res.redirect('/admin/category/list');
    });
}

//list page
exports.list = function (req, res) {
    Category.fetch(function (err, categories) {
        if (err) {
            console.log(err);
        }
        res.render('categorylist', {
            title: '电影列表',
            categories: categories,
        })
    })
};
