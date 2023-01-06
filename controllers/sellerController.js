const Seller = require('../models/seller');

exports.seller_create_get = (req, res, next) => {
    res.render('seller_form', {title: "Apply as Seller"});
}