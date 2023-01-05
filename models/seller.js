const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    joined_date: {type: Date, required:true},
    items: {type:Object.Types.id, ref: 'Item', required: true}
});

SellerSchema.virtual('url').get(function() {
    return `/store/seller/${this._id}`;
});

module.exports = mongoose.model('Seller', SellerSchema);