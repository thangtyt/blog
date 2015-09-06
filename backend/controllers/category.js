/**
 * Created by nguyenthang on 8/17/15.
 */
'use strict';

module.exports.add = function (req,res) {
    let id = req.params.id || 0;
    if (id===0){
        res.render('category/new',{
            title : 'Add New Category',
            route : '/admin/category/save',
            buttonSubmit : 'Create'
        });
    }else{
        db.category.findOne({
            where : {
                id : id
            }
        }).then(function (result) {
            res.render('category/new',{
                title : 'Edit New Category',
                category : result,
                route : '/admin/category/edit',
                buttonSubmit : 'Edit'
            });
        }).catch(function (err) {
            res.render('error',{error : err.message});
        })
    }

}
module.exports.save = function (req,res) {

    console.log('category add method post');
    let form = req.body;
    db.category.create(form)
        .then(function (result) {
            if (result){
                res.render('category/new',{
                    title : 'Edit New Category',
                    success : 'Create category successful',
                    route : '/admin/category/edit',
                    category : result,
                    buttonSubmit : 'Edit'
                });
            }else{
                res.render('category/new',{
                    title : 'Add New Category',
                    route : '/admin/category/save',
                    error : 'Create category unsuccessful',
                    buttonSubmit : 'Create'
                });
            }
        })
        .catch(function (err) {
            res.render('category/new',{
                title : 'Create New Category',
                error : 'Category is existed ! Please try again !',
                route : '/admin/category/save',
                category : form,
                buttonSubmit : 'Create'
            });
        })
}
module.exports.update = function (req,res) {

    console.log('category edit method post');
    let form = req.body;
    db.category.findOne({
        where : {
            id : form.id
        }
    }).then(function (category) {
        category.updateAttributes(form)
            .then(function (result) {
                if (result){
                    res.render('category/new',{
                        title : 'Edit New Category',
                        success : 'Edit category successful',
                        route : '/admin/category/edit',
                        category : result,
                        buttonSubmit : 'Edit'
                    });
                }else{
                    res.render('category/new',{
                        title : 'Edit New Category',
                        error : 'Edit category unsuccessful',
                        route : '/admin/category/edit',
                        buttonSubmit : 'Edit',
                        category : result
                    });
                }
        }).catch(function (err) {
                res.render('category/new',{
                    title : 'Edit New Category',
                    error : 'Edit category unsuccessful',
                    route : '/admin/category/edit',
                    buttonSubmit : 'Edit',
                    category : form
                });
            })
    })
    .catch(function (err) {
        res.render('category/new',{
            title : 'Edit New Category',
            success : 'Edit category successful',
            route : '/admin/category/edit',
            buttonSubmit : 'Edit Post',
            category : result
        });
    })

}
module.exports.list = function (req,res) {
    console.log('list');
    let text=req.params.search || '';
    let numOfPage = __config.pagination;
    let page = req.params.page || 1;
    db.category.findAndCountAll({
        where : [" \"name\" ILIKE '%"+text+"%' OR \"desc\" ILIKE '%"+text+"%' "],
        order : 'name DESC',
        limit : numOfPage,
        offset : (page-1)*numOfPage
    }).then(function (results) {
        let totalPage = Math.ceil(results.count/numOfPage);
        res.render('category/list',{
            title : 'All Categories',
            categories : results.rows,
            totalPage : totalPage,
            currPage : page,
            strSearch : text

        });
    })

}
module.exports.delete = function (req,res){

    let page = req.params.page || 1;
    let id = req.params.id;
    db.category.destroy({
        where : {
            id : id
        }
    }).then(function (result) {
        if (result > 0){

            db.category.count().then(function (count) {
                let totalPage = Math.ceil(count/__config.pagination);
                //console.log(totalPage+'total'+count+'page'+__config.pagination);
                if (page > totalPage){
                    page = totalPage;
                }
                res.redirect('/admin/category/list/'+page)
            })

        }else{
            res.render('error',{error : 'Error when delete category id : '+id});
        }
    })
}

