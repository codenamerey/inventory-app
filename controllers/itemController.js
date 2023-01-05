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

exports.item_category_get = (req, res, next) => {
    Item.find({category: req.params.category})
        .populate('seller')
        .exec(function(err, category_items) {
            if(err) return next(err);

            res.render('items', {title: req.params.category, items: category_items});
        });
};

exports.item_id_get = (req, res, next) => {
    Item.findById(req.params.id)
        .populate('seller')
};