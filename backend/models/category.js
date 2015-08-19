/**
 * Created by nguyenthang on 8/18/15.
 */
'use strict'
module.exports = function(sequelize, DataTypes) {
    let post =  sequelize.define('category', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type:DataTypes.STRING,
            unique : true
        } ,
        desc:DataTypes.STRING
    });
    post.sync();
    return post;
};
