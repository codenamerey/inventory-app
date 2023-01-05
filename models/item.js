const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required:true},
    seller: {type: Object.Types.id, ref: "Seller", required: true},
    price: {type:Float32Array, required:true},
    desc: {type:String, required:true},
    available: {type:Int32Array, required:true}
})

ItemSchema.virtual('url').get(function() {
    return `/store/item/${this._id}`;
});

module.exports = mongoose.Model('Item', ItemSchema);