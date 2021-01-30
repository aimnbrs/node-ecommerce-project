const mongoose = require('mongoose');

const ProductItemsSchema = mongoose.Schema({
    quantity : {type : Number, required : true},
    model: { type: String, required: true },
    url: { type: String, required: true },
    price: { type: String, required: true },
    product : {
        _id : {
            type :  mongoose.Schema.Types.ObjectId,
            ref : "Product", 
            required : true}
    }
})

const adresseSchema = mongoose.Schema({
    street : {type : String, required : true},
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country : { type: String, required: true },
})

const orderSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    isPayed : {type : Boolean},
    isdelivered : {type : Boolean, required : true},
    delivredAt : {type : Date},
    productsCost : {type : Number , requied : true},
    deliveryCost : {type : Number , requied : true},
    taxes : {type : Number, required : true},
    total : {type : Number, required : true},
    adresse : adresseSchema,
    productItems : ProductItemsSchema,
})

const orderModel = mongoose.model('Order', orderSchema);
module.exports = orderModel;
