const mongoose = require('mongoose');


const productSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    model : {type : String , requied : true},
    price : {type : String , required : true},
    category : {type : String, required : true},
    url : {type : String , required : true}
})

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
