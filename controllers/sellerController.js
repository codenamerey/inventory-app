const Seller = require('../models/seller');
const { validationResult, body } = require('express-validator');


exports.seller_id_get = (req, res, next) => {
    res.send(`Page for seller ${req.params.id} is not ready yet.`);
}

exports.seller_create_get = (req, res, next) => {
    res.render('seller_form', {title: "Apply as Seller"});
}

exports.seller_create_post = [
    body('first_name', 'First name must not be empty').trim()
                      .isLength({min:1})
                      .escape(),
    body('last_name', 'Last name must not be empty').trim()
                      .isLength({min:1})
                      .escape(),
    (req, res, next) => {
        const errors = validationResult(req);

        const seller = new Seller({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            joined_date: new Date()
        });

        if(!errors.isEmpty()) {
            //There are errors, re-render page with acceptable inputs
            res.render('seller_form', {title: "Apply as Seller", errors: errors.array(), seller})
        }

        //Save new seller to database
        seller.save((err) => {
           if(err) return next(err);
           
           res.redirect(seller.url);
        });

    }
];