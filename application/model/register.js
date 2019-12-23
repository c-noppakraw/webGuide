var express = require('express');
var empty = require('is-empty');
var connection = require('../config/db');
var { body, validationResult } = require('express-validator');

var listDistricts = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            sql = "SELECT province, province_code FROM districts GROUP BY province_code" ;
            connection.query(sql, function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
            
        });
    };
    var dataList = await myReturn();    
    return dataList ;
}
var getAmphoes = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            var { province_code } = req.body;
            sql = "SELECT amphoe_code, amphoe FROM districts WHERE province_code = ? GROUP BY amphoe_code" ;
            connection.query(sql, [province_code], function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
        });
    };
    var dataList = await myReturn();   
    return JSON.stringify(dataList, null, '\t') ;
}
var getDistrict = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            var { amphoe_code } = req.body;
            sql = "SELECT district_code, district FROM districts WHERE amphoe_code = ? " ;
            connection.query(sql, [amphoe_code], function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
        });
    };
    var dataList = await myReturn();   
    return JSON.stringify(dataList, null, '\t') ;
}
var getZipcode = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            var { district_code } = req.body;
            sql = "SELECT zipcode FROM districts WHERE district_code = ? " ;
            connection.query(sql, [district_code], function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
        });
    };
    var dataList = await myReturn();  
    return dataList[0].zipcode;
    // var zip = JSON.stringify(dataList, null, '\t') ; 
    // console.log(zip['zipcode']);
    // return JSON.stringify(dataList, null, '\t') ;
    // console.log(dataList[0].zipcode);
    // console.log(dataList['zipcode']);
    
}

module.exports = {listDistricts, getAmphoes, getDistrict, getZipcode};