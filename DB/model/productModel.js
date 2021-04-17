const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    model : {type : String , requied : true},
    price : {type : Number , required : true},
    status : {type : String , requied : true},
    color : {type : String , requied : true},
    style : {type : String , requied : true},
    category : {type : String, required : true},
    url : {type : String , required : true}
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
