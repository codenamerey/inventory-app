var express = require('express');
var router = express.Router();
const Item = require('../models/item');
/* GET home page. */
router.get('/', function(req, res, next) {
  let categories_array = [];
  Item.find({}, "category")
      .exec(function(err, categories) {
        categories.forEach((category) => {
          if(categories_array.includes(category.category)) return;
          categories_array.push(category.category);
        })

        res.render('index', { title: 'FakeStore', categories: categories_array});
      });
});

module.exports = router;
