const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {type: String, required:true},
    seller: {type: Schema.Types.ObjectId, ref: 'Seller', required: true},
    price: {type:Number, required:true},
    desc: {type:String, required:true},
    available: {type:Number, required:true},
    category: {type:String}
})

ItemSchema.virtual('url').get(function() {
    return `/store/item/${this._id}`;
});

module.exports = mongoose.model('Item', ItemSchema);