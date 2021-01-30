const mongoose = require('mongoose');



const userSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    isAdmin : {type : Boolean, required: true, default: false },
    name : {type : String , requied : true},
    email : {type : String , requied : true, unique : true},
    password : {type : Number, required : true},
    phoneNumber : {type : Number},
    avatarUrl : {type : String},
    wishList : {type : Object},
})

const userModel = mongoose.model('User', userSchema);
module.exports = userModel;
