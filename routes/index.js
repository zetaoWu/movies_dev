var Index = require('../app/controllers/index');
var Movie = require('../app/controllers/movie');
var User = require('../app/controllers/user');
var Comment =require('../app/controllers/comment');
var Category =require('../app/controllers/category'); 

var express = require('express');
var router = express.Router();

var multiparty=require('connect-multiparty');
var multipartyMiddleWare=multiparty();

//预处理 。pre handle user
router.use(function (req, res, next) {
    var _user = req.session.user;
    res.locals.user = _user;
    return next();
});

// index page
router.get('/', Index.index);

//category
router.get('/admin/category/new',User.signinRequired,User.adminRequired,Category.new);
router.post('/admin/category',User.signinRequired,User.adminRequired,Category.save);
router.get('/admin/category/list',User.signinRequired,User.adminRequired,Category.list);

//movie
router.get('/movie/:id', Movie.detail);
router.get('/admin/movie/update/:id',User.signinRequired,User.adminRequired,  Movie.update);
router.get('/admin/movie/new', User.signinRequired,User.adminRequired, Movie.new);
router.get('/admin/movie/list', User.signinRequired,User.adminRequired, Movie.list)
router.post('/admin/movie',multipartyMiddleWare,User.signinRequired,User.adminRequired,Movie.savePoster,Movie.save);
router.delete('/admin/movie/list',User.signinRequired,User.adminRequired, Movie.del);

//user
router.post('/user/signup', User.signup);
router.post('/user/signin', User.signin);
router.get('/signin',User.showSignin);
router.get('/signup',User.showSignup);
router.get('/logout', User.logout);
router.get('/admin/user/list', User.signinRequired,User.adminRequired,User.list);

//comment
router.post('/user/comment',User.signinRequired,Comment.save);
router.get('/results',Index.search);


module.exports = router;
