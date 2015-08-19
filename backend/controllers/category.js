/**
 * Created by nguyenthang on 8/17/15.
 */
'use strict';

module.exports.add = function (req,res) {
    console.log('category add method get');
    res.render('category/new',{
        title : 'Add New Category'
    });
}
module.exports.save = function (req,res) {
    console.log('category add method post');
    let form = req.body;
    db.category.create(form)
        .then(function (result) {
            if (result){
                res.render('category/new',{
                    title : 'Edit New Category',
                    success : 'Create new category successful',
                    category : result
                });
            }else{
                res.render('category/new',{
                    title : 'Add New Category',
                    error : 'Create category unsuccessful'
                });
            }
        })
        .catch(function (err) {
            res.render('category/new',{
                title : 'Edit New Category',
                error : 'Category is existed ! Please try again !',
                category : form
            });
        })
}
module.exports.list = function (req,res) {
    let numOfPage = req.params.numOfPage || 10;
    let page = req.params.page || 1;
    db.category.findAndCountAll({
        limit : numOfPage,
        offset : (page-1)*numOfPage
    }).then(function (results) {
        res.render('category/list',{
            title : 'All Categories',
            categories : results.rows,
            totalPage : Math.ceil(results.count/numOfPage)

        });
    })

}

