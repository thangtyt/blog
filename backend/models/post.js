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
        title: DataTypes.STRING,
        content:DataTypes.TEXT,
        desc:DataTypes.STRING
    });
    post.sync();
    return post;
};
