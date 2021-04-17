const mongoose = require('mongoose');



const blogsSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    artical : {type : String , requied : true},
    author : {type : String, required : true},
    url : {type : String, required : true},
    text : {type : String, required : true},
})

const blogsModel = mongoose.model('Blogs', blogsSchema);
module.exports = blogsModel;