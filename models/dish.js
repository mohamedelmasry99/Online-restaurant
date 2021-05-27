const mongoose = require('mongoose');


const dishSchema = mongoose.Schema({
    title : { type: String, required : true},
    desc : {type:String, required : true},
    price : {type:Number, required : true}
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports= Dish;