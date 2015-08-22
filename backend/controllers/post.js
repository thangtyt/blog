/**
 * Created by nguyenthang on 8/17/15.
 */
'use strict';
//let Promise = require('bluebird');
module.exports.add = function (req,res) {
    let id = req.params.id || 0;
    db.category.findAll()
    .then(function (category) {
        if (category){
            if (id===0){
                res.render('post/new',{
                    title : 'Add New Post',
                    route : '/admin/blog/post/new',
                    categories : category
                });
            }else{
                db.post.findOne({
                    where : {
                        id : id
                    }
                }).then(function (result) {
                    res.render('post/new',{
                        title : 'Edit Post',
                        route : '/admin/blog/post/edit',
                        categories : category,
                        buttonSubmit : 'Edit Post'
                    });
                }).catch(function (err) {
                    res.render('error',{error : err});
                })
            }
        }else{
            res.render('post/new',{
                title : 'Add New Post'
            });
        }
    })
}
module.exports.save = function (req,res) {
    let form = req.body;
    form.categories = { categories : form.categories};
    db.post.create(form)
        .then(function (post) {
            db.category.findAll()
                .then(function (result) {
                    if (result){
                        res.render('post/new',{
                            title : 'Edit Post',
                            categories : result,
                            post : post,
                            route : '/admin/blog/post/edit',
                            success : 'Create Post successful',
                            buttonSubmit : 'Edit Post'
                        });
                    }else{
                        res.render('error',{error : 'Cannot get categories'
                        });
                    }
                })
    }).catch(function (err) {
            res.render('error',{error : err});
        })


}

