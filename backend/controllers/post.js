/**
 * Created by nguyenthang on 8/17/15.
 */
'use strict';
//let Promise = require('bluebird');
module.exports.add = function (req,res) {
        db.category.findAll()
    .then(function (result) {
        if (result){
            res.render('post/new',{
                title : 'Add New Post',
                categories : result
            });
        }else{
            res.render('post/new',{
                title : 'Add New Post'
            });
        }
    })
}

