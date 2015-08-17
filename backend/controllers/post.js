/**
 * Created by nguyenthang on 8/17/15.
 */
'use strict';

module.exports.add = function (req,res) {
    db.post.find({
        where : {
            id : 0
        }
    }).then(function (result) {
        if (result){
            res.render('blog/new',{
                title : 'Add New Post'
            });
        }else{
            res.render('blog/new',{
                title : 'Add New Post'
            });
        }
    })
}

