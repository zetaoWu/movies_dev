//schema数据模型
var mongoose = require('mongoose');
//加密
var bcrypt = require('bcrypt');

let SALT_WORK_FACTORY = 10;
var UserSchema = new mongoose.Schema({
    name: {
        unique: true,
        type: String,
    },
    password: String,
    meta: {
        createAt: {
            type: Date,
            default: Date.now(),
        },
        updateAt: {
            type: Date,
            default: Date.now(),
        }
    }
});

//设置中间件
UserSchema.pre('save', function (next) {
    var user=this;
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    //加盐 。
    bcrypt.genSalt(SALT_WORK_FACTORY, function (err, salt) {
        if (err) {
            return next(err);
        }
        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) {
                return next(err);
            }
            user.password=hash;
            next();
        });
    });

    next();
});

UserSchema.statics = {
    fetch(cb) {
        return this.find({}).sort('meta.updateAt').exec(cb);
    },
    findById(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    }
}

module.exports = UserSchema;
