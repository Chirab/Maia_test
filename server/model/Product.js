let mongoose = require('mongoose');         //schema d'organisation de notre base de donnée mongodb
let ProductSchema = new mongoose.Schema({
    product : {
        type: String,
        required: true,
        default: ''
    },
    EAN : {
      type : String,
      required: true,
      default: ''
    },
    quantity : {
        type : Number,
        required: true,
        default: ''
    }
});
const Product = mongoose.model('Product', ProductSchema);
module.exports = Product;
