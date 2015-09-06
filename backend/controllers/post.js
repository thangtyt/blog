/**
 * Created by nguyenthang on 8/17/15.
 */
'use strict';
let Promise = require('bluebird');
module.exports.add = function (req,res) {
    let id = req.params.id || 0;
    db.category.findAll()
    .then(function (category) {
        if (category){
            if (id===0){
                res.render('post/new',{
                    title : 'Add New Post',
                    route : '/admin/blog/post/new',
                    categories : category,
                    buttonSubmit : 'Create Post'
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
    console.log('save : ');
    let form = req.body;
    //console.log(form);
    //form.categories = { categories : form.categories};
    let dataReturn = {
        title : 'Edit Post',
        route : '/admin/blog/post/edit',
        buttonSubmit : 'Edit Post'
    }
    Promise.all([
        db.post.create(form),
        db.category.findAll()
    ]).then(function (results) {
        if (results[0]){
            dataReturn.post = results[0];
            dataReturn.success = 'Create Post successful';
        }
        if (results[1]){
            dataReturn.categories = results[1];
        }
        //console.log('data return : '+JSON.stringify(dataReturn));
        res.render('post/new',dataReturn);
    }).catch(function (err) {
        dataReturn.post = form;
        dataReturn.error = 'Create post unsuccessfully ! \\n error : '+err;
        res.render('post/new',dataReturn);
    })
}
module.exports.update = function (req,res) {
    let form = req.body;
    form.categories = { categories : form.categories};
    let dataReturn = {
        title : 'Edit Post',
        route : '/admin/blog/post/edit',
        buttonSubmit : 'Edit Post'
    }
    db.post.findOne({
        where : {
            id : form.id
        }
    })
    .then(function (post) {
        post.updateAttributes(form)
            .then(function (result) {
                //console.log('update post : ',JSON.stringify(result));
                db.category.findAll()
                    .then(function (categories) {
                        console.log(JSON.stringify(categories));
                        dataReturn.categories = categories;
                        if(result){
                            dataReturn = {"post" : result};
                            dataReturn.success = 'Edit post successfully !'
                        }else{
                            dataReturn={"post" : form};
                            dataReturn.error = 'Edit post unsuccessfully !'
                        }
                        console.log('data : '+JSON.stringify(dataReturn));
                        res.render('post/new',dataReturn);
                    });
            })
    }).catch(function (err) {
        dataReturn = {"post" : form};
        dataReturn = {"error" : 'Edit post unsuccessfully !'}
        res.render('post/new',dataReturn);
    })
}
module.exports.list = function (req,res) {
    db.post.findAll().then(function (posts) {
        res.render('post/list',{title : 'List all post',posts : posts});
    }).catch(function (err) {
        res.render('error',{error : 'Loi'});
    });

}
