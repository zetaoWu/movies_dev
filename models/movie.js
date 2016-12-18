var mongoose=require('mongoose');
var MovieSchema=require('../schemas/movie');
var Movie =mongoose.model('Movie',MovieSchema);

// Movie.prototype.findByName=(query,callback)=>{
//     MovieSchema.findOne(query,function(err,obj){
//         callback(err,obj);
//     });
// }
module.exports= Movie;
