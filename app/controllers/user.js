var User = require('../models/user.js');


exports.showSignup = function (req, res) {
  res.render('signup', {
    title: '注册页面'
  });
}

exports.showSignin = function (req, res) {
  res.render('signin', {
    title: '登录页面'
  });
}

exports.signup = function (req, res) {
  var _user = req.body.user;

  User.findOne({ name: _user.name }, function (err, user) {
    if (err) {
      console.log(err);
    } else {

      console.log(user + '---user');
      if (user) {
        console.log('存在');
        res.redirect('/signin');
      } else {
        console.log('不存在');
        var user = new User(_user);
        user.save(function (err, user) {
          if (err) {
            console.log(err);
          }
          console.log(user);
          res.redirect('/')
        })
      }
    }
  });
};

exports.signin = function (req, res) {
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({ name: name }, function (err, user) {
    if (err) {
      console.log(err);
    }

    if (!user) {
      console.log('用户没找到--跳转首页');
      return res.redirect('/signup');
    } else {

      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          console.log(err);
        }
        if (isMatch) {
          req.session.user = user;
          console.log("Password is matched");
          return res.redirect('/');
        } else {
          console.log("Password is not matched");
          res.redirect('/signin');
        }
      });
    }
  });
};

exports.list = function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.warn(err);
    }
    res.render('userlist', {
      title: '用户列表页',
      users: users,
    })
  })
}

exports.logout = function (req, res) {
  console.log("登出");
  delete req.session.user;
  res.redirect('/');
};


//midware for user
exports.signinRequired=function(req,res,next){
  var user=req.session.user;
  console.log('--signinRequired--'+user);
  if(!user){
    return res.redirect('/signin');
  }
  next();
}


exports.adminRequired=function(req,res,next){
  var user=req.session.user;
  // if(user.role<=10){
  //   return res.redirect('/signin');
  // }
  next();
}