/**
 * Created by nguyenthang on 8/22/15.
 */
'use strict';

module.exports = function (sequelize, DataTypes) {
    let user = sequelize.define('user',{
        id: {
            type : DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username : {
            type: DataTypes.STRING,
            unique : true
        },
        password : {
            type:DataTypes.STRING,
            set : function(val){

            }
        },
        phone : {
            type:DataTypes.STRING
        },
        fullname : {
            type : DataTypes.STRING
        },
        imageUrl : {
            type : DataTypes.STRING
        }

    });
    user.sync();
    return user;
}