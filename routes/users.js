var express = require('express');
var router = express.Router();

var User = require('../models/user.js');
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', function (req, res) {
  var _user = req.body.user;

  User.findOne({ name: _user.name }, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      console.log(user + '---user');
      if (user) {
        console.log('存在');
         res.redirect('/');
      } else {
        console.log('不存在');
        var user = new User(_user);
        user.save(function (err, user) {
          if (err) {
            console.log(err);
          }
          console.log(user);
          res.redirect('/user/admin/userlist')
        })
      }
    }
  });
});

router.post('/signin', function (req, res) {
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({ name: name }, function (err, user) {
    if (err) {
      console.log(err);
    }

    if (!user) {
      console.log('用户没找到--跳转首页');
      return res.redirect('/');
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
          res.redirect('/');
        }
      });
    }
  });
})

router.get('/admin/userlist', function (req, res) {
  User.fetch(function (err, users) {
    if (err) {
      console.warn(err);
    }
    res.render('userlist', {
      title: '用户列表页',
      users: users,
    })
  })
})

module.exports = router;
