const { body, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const passport = require('passport');

exports.sign_up_get = (req, res, next) => {
    res.render('sign-up-form', {title: "Sign Up"});
}

exports.sign_up_post = [
    body('username', 'Username is required').trim()
                    .isLength({min: 1})
                    .escape(),
    body('password', 'Password is required').trim()
                    .isLength({min: 1})
                    .escape(),
    (req, res, next) => {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
            if(err) return next(err);

            const user = new User({
                username: req.body.username,
                password: hashedPassword
            });

            user.save((err) => {
                if(err) return next(err);

                res.redirect('/log-in');
            })
        });
    }
];

exports.log_in_get = (req, res, next) => {
    res.render('log-in-form', {title: 'Log In'});
}

exports.log_in_post =
    passport.authenticate("local", {
        successRedirect: '/',
        failureRedirect: '/'
    });

exports.log_out_get = (req, res, next) => {
    req.logout(function(err) {
        if(err) return next(err);

        res.redirect('/');
    })
}