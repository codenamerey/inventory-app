const Seller = require('../models/seller');
const Item = require('../models/item');
const User = require('../models/user');

const { validationResult, body } = require('express-validator');
const async = require('async');
const user = require('../models/user');


exports.seller_id_get = (req, res, next) => {
    // If seller is user, then add option to upload item

    async.parallel(
        {
            user(callback) {
                if(!req.user) return callback(null, null);
                Seller.findById(req.params.id)
                      .populate('user')
                      .exec(function(err, seller) {
                        if(!seller.user) return callback(null, null);
                        if(req.user.id == seller.user.id) return callback(null, seller);
                        callback(null, null);
                      })
                    //     (err, seller) => {

                    //         console.log('User', req.user)
                    //         console.log('Seller', seller)
                    //         if(req.user == seller.user) {
                    //             console.log('User', req.user)
                    //             console.log('Seller', seller)
                    //             return callback(null, seller);
                    //         }
                    //     })
                    //     callback(null, null);
                    //   })
            },
            
            sellerItems(callback) {
                Item.find({seller: req.params.id})
                    .exec(function(err, seller_items) {
                        if(err) return next(err);

                        callback(null, seller_items);
                    })
            },

            sellerDetails(callback) {
                Seller.findById(req.params.id)
                    .populate('items')
                    .exec(function(err, seller) {
                        if(err) return next(err);

                        callback(null, seller)
                })
            }
        },

        (err, results) => {

            if(err) return next(err);
            res.render('seller_detail', {title: results.sellerDetails.name, seller: results.sellerDetails, items:results.sellerItems, user: results.user});
        }
    )
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
            joined_date: new Date(),
            user: req.user
        });

        if(!errors.isEmpty()) {
            //There are errors, re-render page with acceptable inputs
            res.render('seller_form', {title: "Apply as Seller", errors: errors.array(), seller})
        }

        //Save new seller to database
        seller.save((err) => {
           if(err) return next(err);
           User.findByIdAndUpdate(req.user.id, {$set: {isSeller: true}}, function(err) {
            if(err) return next(err);
           });
           res.redirect(seller.url);
        });
    }
];