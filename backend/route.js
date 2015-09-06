/**
 * Created by nguyenthang on 8/17/15.
 */
    'use strict'
let express = require('express');
let router = express.Router();
let blog = require('./controllers/post');
let category = require('./controllers/category');
/* GET home page of administrator */
router.get('/', function(req, res, next) {
    console.log('admin route');
    res.render('index', { title: 'Administrator' });
});

router.get('/blog/post', function (req,res) {
    blog.list(req,res);
});
//link to add new post
router.get('/blog/post/new', function (req,res) {
    blog.add(req,res);
});
router.post('/blog/post/new', function (req,res) {
    blog.save(req,res);
});
router.post('/blog/post/edit', function (req,res) {
    blog.update(req,res);
});



//
router.get('/category/new', function (req,res) {
    category.add(req,res);
});
router.get('/category/:id([0-9]+)', function (req,res) {
    category.add(req,res);
});
router.post('/category/save', function (req,res) {
    category.save(req,res);
});
router.post('/category/edit', function (req,res) {
    category.update(req,res);
});
router.get('/category/list', function (req,res) {
    category.list(req,res);
});
router.get('/category/list/:page', function (req,res) {
    category.list(req,res);
});
router.get('/category/list/:page/:search', function (req,res) {
    category.list(req,res);
});
router.get('/category/delete/:id/:page', function (req,res) {
    category.delete(req,res);
});
module.exports = router;
