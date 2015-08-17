/**
 * Created by nguyenthang on 8/17/15.
 */
    'use strict'
let express = require('express');
let router = express.Router();
let blog = require('./controllers/post');
/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('admin route');
    res.render('index', { title: 'Administrator' });
});

router.get('/blog/new', function (req,res) {
    blog.add(req,res);
});
module.exports = router;
