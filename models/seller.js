const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SellerSchema = new Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    joined_date: {type: Date, required:true},
    items: {type:Schema.Types.ObjectId, ref: 'Item'}
});

SellerSchema.virtual('url').get(function() {
    return `/store/seller/${this._id}`;
});

SellerSchema.virtual('name').get(function() {
    return `${this.first_name} ${this.last_name}`;
})

module.exports = mongoose.model('Seller', SellerSchema);