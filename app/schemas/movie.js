//schema数据模型
var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var ObjectId=Schema.Types.ObjectId;

var MovieSchema=new Schema({
    category:{
        type:ObjectId,
        ref:'Category',
    },
    doctor:String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    meta:{
        createAt:{
            type:Date,
            default:Date.now(),
        },
        updateAt:{
            type:Date,
            default:Date.now(),
        }
    }
});


//设置中间件 。在save方法中提前预处理。
MovieSchema.pre('save',function(next){
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
});

MovieSchema.statics={
    fetch(cb){
        return this.find().sort('meta.updateAt').exec(cb);
    },
    findById(id,cb){
        return this.findOne({_id:id}).exec(cb);
    },
    findByName(query,cb){
        return this.find().exec(cb);
    } 
}


module.exports= MovieSchema;
