const Item = require('../models/item');
const Seller = require('../models/seller');
const multer = require('multer');
const storage = multer.diskStorage({destination: function(req, file, cb) {
    cb(null, 'public/images');
}, filename: function(req, file, cb) {
    
    cb(null, file.originalname);
}});
const upload = multer({storage: storage});
exports.index = (req, res, next) => {
    Item.find({}, "name seller imageURL")
        .sort({name: 1})
        .populate('seller')
        .exec(function(err, items) {
            if(err) return next(err);
            res.render('items', {title: 'Fake Items (All)', items, user:req.user});
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
        .exec(function(err, item) {
            if(err) return next(err);
            res.render('item_detail', {title: item.name, item});
        })
};

exports.product_create_get = (req, res, next) => {
    let categories_array = [];
    Item.find({}, "category")
        .exec(function(err, categories) {
          categories.forEach((category) => {
            if(categories_array.includes(category.category)) return;
            categories_array.push(category.category);
          })
  
          res.render('item-form', {title: 'Create Product', categories: categories_array});
        });
}

exports.product_create_post = [
    upload.single('product-pic'),
    (req, res, next) => {
        Seller.findOne({user: req.user}, (err, seller) => {
                if(err) return next(err);

                const item = new Item({
                    name: req.body.item_name,
                    price: req.body.item_price,
                    desc: req.body.item_desc,
                    available: req.body.item_stock,
                    category: req.body.category,
                    imageURL: `/images/${req.file.originalname}`,
                    seller: seller
                })

                item.save((err) => {
                    if(err) return next(err);

                    res.redirect('/store/item/' + item.id);
                })
        })
    }
]