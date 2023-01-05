const Item = require('../models/item');
const Seller = require('../models/seller');
exports.index = (req, res, next) => {
    Item.find({}, "name seller imageURL")
        .sort({name: 1})
        .populate('seller')
        .exec(function(err, items) {
            if(err) return next(err);

            res.render('items', {title: 'Fake Items (All)', items});
        });
}