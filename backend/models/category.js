/**
 * Created by nguyenthang on 8/18/15.
 */
'use strict'
module.exports = function(sequelize, DataTypes) {
    let categories =  sequelize.define('category', {
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type:DataTypes.STRING,
            unique : true
        } ,
        update : {
            type:DataTypes.DATE
        },
        desc:DataTypes.STRING
    },
        {
            updatedAt : 'update'
        }
    );
    categories.sync();
    return categories;
};
