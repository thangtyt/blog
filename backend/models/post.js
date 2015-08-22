/**
 * Created by nguyenthang on 8/18/15.
 */
'use strict'
module.exports = function(sequelize, DataTypes) {
    let post =  sequelize.define('post', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        type : {
            type : DataTypes.INTEGER,
            validate : {
                isIn : [[0,1]]
            }
        },
        title: {
            type : DataTypes.STRING,
            unique : true
        },
        content:DataTypes.TEXT,
        desc:DataTypes.STRING,
        author:DataTypes.INTEGER,
        categories:{
            type : DataTypes.JSON
        }
    });
    post.sync();
    return post;
};
