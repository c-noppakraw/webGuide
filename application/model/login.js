var express = require('express');
var empty = require('is-empty');
var connection = require('../config/db');
var { body, validationResult } = require('express-validator');
// var bcrypt = require('bcryptjs');
// var saltRounds = 10;

var getLoginPage = async (req, res) => {
    var data = validationResult(req);
    var errors = data.errors;
    if (!data.isEmpty()) {
        res.render('form_login', {errors:errors} );
    } else {
        // var { username, password } = req.body
        var user = req.body.username.charAt(0).toUpperCase() + req.body.username.slice(1);
        var passEn = Buffer.from(req.body.password+'//'+user).toString('base64');
        // console.log(user+' '+passEn);
        
        var myReturnAdmin = () => {
                return new Promise((resolve, reject) => {
                    sql = "SELECT * FROM admin WHERE username = ? AND password = ? AND visible ='1'";
                    connection.query(sql, [user, passEn], function (error, result, fields) {
                        if (error) throw error;
                        resolve(result);
                        // console.log(result);
                    });
                });
            };
            
        var dataQueAdmin = await myReturnAdmin();

        var myReturnGuide = () => {
            return new Promise((resolve, reject) => {
                sql = "SELECT * FROM guide WHERE username = ? AND password = ? AND visible ='1'";
                connection.query(sql, [user, passEn], function (error, result, fields) {
                    if (error) throw error;
                    resolve(result);
                });
            });
        };
        
        var dataQueGuide = await myReturnGuide();

            if (!empty(dataQueAdmin)) {
                dataQueAdmin.forEach(dataLogin => {
                    if(!empty(dataLogin)) {
                        // var level = dataLogin.level_admin ;
                        var MAX_AGE = 3600000;
                            req.session.loggedin = true;
                            req.session.id_admin = dataLogin.id_admin;
                            req.session.username = dataLogin.username;
                            req.session.img_admin = dataLogin.img_admin;
                            req.session.level_admin = dataLogin.level_admin;
                            req.session.cookie.maxAge = MAX_AGE
                            res.redirect('/mainadmin');      
                            // res.redirect('/login/makeSes');                          
                        }
                    });
                } else if(!empty(dataQueGuide)) {
                    dataQueGuide.forEach(dataLogin => {
                        if(!empty(dataLogin)) {
                            var MAX_AGE = 3600000;
                                req.session.loggedin = true;
                                req.session.id_guide = dataLogin.id_guide;
                                req.session.usernames = dataLogin.username;
                                req.session.imgGuide = dataLogin.imgGuide;
                                req.session.cookie.maxAge = MAX_AGE;
                                res.redirect('/mainguide');
                    }
                });
            } else {
                var mesError = "ไม่พบข้อมูลในระบบ";
                res.render('form_login', {alretMes: mesError} );
            }   
    }
}

module.exports = {getLoginPage};