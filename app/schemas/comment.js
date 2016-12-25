//schema数据模型
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var CommentSchema = new Schema({
    movie: { type: ObjectId, ref: 'Movie' },
    from: { type: ObjectId, ref: 'User' },
    to: { type: ObjectId, ref: 'User' },
    reply: [{
        from: { type: ObjectId, ref: 'User' },
        to: { type: ObjectId, ref: 'User' },
        conteng: String,
    }],
    content: String,
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


//设置中间件 。在save方法中提前预处理。
CommentSchema.pre('save', function (next) {
    if (this.isNew) {
        this.meta.createAt = this.meta.updateAt = Date.now();
    } else {
        this.meta.updateAt = Date.now();
    }
    next();
});

CommentSchema.statics = {
    fetch(cb) {
        return this.find().sort('meta.updateAt').exec(cb);
    },
    findById(id, cb) {
        return this.findOne({ _id: id }).exec(cb);
    },
    findByName(query, cb) {
        return this.find().exec(cb);
    }
}


module.exports = CommentSchema;
