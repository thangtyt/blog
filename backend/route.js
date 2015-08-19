/**
 * Created by nguyenthang on 8/17/15.
 */
    'use strict'
let express = require('express');
let router = express.Router();
let blog = require('./controllers/post');
let category = require('./controllers/category');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('admin route');
    res.render('index', { title: 'Administrator' });
});

router.get('/blog/post/new', function (req,res) {
    blog.add(req,res);
});
router.get('/category/new', function (req,res) {
    category.add(req,res);
});
router.post('/category/save', function (req,res) {
    category.save(req,res);
});
router.get('/category/list', function (req,res) {
    category.list(req,res);
});
module.exports = router;
