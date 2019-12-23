var express = require('express');
var empty = require('is-empty');
var connection = require('../config/db');
var { body, validationResult } = require('express-validator');
var multer  = require('multer');
var path = require('path');

var listAdmin = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            sql = "SELECT * FROM admin ORDER BY visible ='2' " ;
            connection.query(sql, function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
            
        });
    };
    var dataList = await myReturn();    
    return dataList ;
}
var addAdmin = async function (req, res) {    
    try {
        var myReturn = () => { 
            return new Promise((resolve, reject) => { 
                // adjust 0 before single digit date
                // date Now
                var date_ob = new Date();
                // current date
                var date = ("0" + date_ob.getDate()).slice(-2);
                // current month
                var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                // current year
                var year = date_ob.getFullYear();
                // current hours
                var hours = date_ob.getHours();
                // current minutes
                var minutes = date_ob.getMinutes();
                // current seconds
                var seconds = date_ob.getSeconds();
            
                var user = req.body.Newuser.charAt(0).toUpperCase() + req.body.Newuser.slice(1);
                var passEn = Buffer.from(req.body.Newpass+'//'+user).toString('base64');

                // var passEn = Buffer.from(passEn, 'base64').toString('ascii')

                var values = {
                    'username': user,
                    'password': passEn,
                    'level_admin': req.body.Newlevel,
                    'adminCreate' : req.body.idAdminCeate,
                    'dateCreate': year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
                };
                connection.query('INSERT INTO admin SET ?;', [values], function (error, result, fields) {
                    if (error) throw error;
                        if (!empty(result.insertId)) {
                            resolve(result.insertId);
                        } else {
                            resolve(0);
                        }
                });
                
            });
        };
        var returnData = await myReturn();       
        return JSON.stringify(returnData, null, '\t') ;

    } catch (error) {
        return error;
    }
}
var getIDListadmin = async function (req, res) {
    var { id_Ad } = req.body ;
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            sql = "SELECT * FROM admin WHERE id_admin = ? " ;
            connection.query(sql, [id_Ad], function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
                // console.log(result);
            });
            
        });
    };
    var data = await myReturn();    
    return JSON.stringify(data,null,'\t') ;
}
var editAdmin = async function (req, res) {
    try {
        var myReturn = () => { 
            return new Promise((resolve, reject) => { 
                // adjust 0 before single digit date
                // date Now
                var date_ob = new Date();
                // current date
                var date = ("0" + date_ob.getDate()).slice(-2);
                // current month
                var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                // current year
                var year = date_ob.getFullYear();
                // current hours
                var hours = date_ob.getHours();
                // current minutes
                var minutes = date_ob.getMinutes();
                // current seconds
                var seconds = date_ob.getSeconds();
                
                var where = {
                    'id_admin': req.body.UpdidAdminOrd
                };
                var values = {
                    'visible': req.body.UpdstatusAdminOrd,
                    'adminUpdate' : req.body.idAdminEdit,
                    'dateUpdate': year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
                };
                connection.query('UPDATE admin SET ? WHERE ?;', [values, where], function (error, result, fields) {
                    if (error) throw error;
                        if (!empty(result.insertId)) {
                            resolve(result.insertId);
                        } else {
                            resolve(0);
                        }
                        // console.log(connection);
                        // console.log(result);
                        
                });
                // console.log(req.body);
                
            });
        }

        var returnData = await myReturn();       
        return JSON.stringify(returnData, null, '\t') ;

    } catch (error) {
        return error;
    }
}
var getTypeCard = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            sql = "SELECT nameType, codeType FROM typecardguide GROUP BY codeType" ;
            connection.query(sql, function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
            
        });
    };
    var dataList = await myReturn();    
    return dataList ;
}
var getDeailTypeCard = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            var { NewType } = req.body;
            sql = "SELECT codeTypeDetail, detailType FROM typecardguide WHERE codeType = ?" ;
            connection.query(sql, [NewType], function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
        });
    };
    var dataList = await myReturn();   
    return JSON.stringify(dataList, null, '\t') ;
}
var listGuide = async function (req, res, next) {
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            sql = "SELECT * FROM guide JOIN cardguide ON guide.id_guide = cardguide.id_guide JOIN districts ON guide.district = districts.district_code JOIN typecardguide ON cardguide.detailCard = typecardguide.codeTypeDetail WHERE cardguide.cardVisible = '1'" ;
            connection.query(sql, function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
            });
            
        });
    };
    var dataList = await myReturn();    
    return dataList ;
}
var addGuide = async function (req, res) {    
    try {
        // var myReturn = () => { 
        //     return new Promise((resolve, reject) => { 
                // adjust 0 before single digit date
                // date Now
                var date_ob = new Date();
                // current date
                var date = ("0" + date_ob.getDate()).slice(-2);
                // current month
                var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
                // current year
                var year = date_ob.getFullYear();
                // current hours
                var hours = date_ob.getHours();
                // current minutes
                var minutes = date_ob.getMinutes();
                // current seconds
                var seconds = date_ob.getSeconds();

                var user = req.body.Newuser.charAt(0).toUpperCase() + req.body.Newuser.slice(1);
                var passEn = Buffer.from(req.body.Newpass+'//'+user).toString('base64');

                console.log(req.body);

                // var passEn = Buffer.from(passEn, 'base64').toString('ascii')

                    var values = {
                        'username': user,
                        'password': passEn,
                        'fiestname': req.body.NewFname,
                        'lastname': req.body.NewLname,
                        'firstnameEN': req.body.NewFnameEN,
                        'lastnameEN': req.body.NewLnameEN,
                        'idCard': req.body.NewIDCard,
                        'passport': req.body.NewPassport,
                        'phone': req.body.NewTel,
                        'email': req.body.NewEmail,
                        'userCreate': req.body.idAdminCeate,
                        'dateCreate': year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
                    };
                    connection.query('INSERT INTO guide SET ?;', [values], function (error, result, fields) {
                        if (error) throw error;
                            if (!empty(result.insertId)) {
                                // resolve(result.insertId);
                                    var values = {
                                        'id_guide': result.insertId,
                                        'typeGuide': req.body.NewType,
                                        'detailCard': req.body.NewDetailType,
                                        'noGuide': req.body.NewNoCard,
                                        'imgCardGuide': 'CG-'+year + month + date + hours + minutes + seconds + '.',
                                        'expiredDate': req.body.endGuide,
                                        'cardVisible': '1',
                                        'userCreate': result.insertId,
                                        'dateCreate': year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds
                                    };
                                        connection.query('INSERT INTO cardguide SET ?;', [values], function (error, result, fields) {
                                            if (error) throw error;
                                                console.log(result);
                                                resolve(result);
                                                // if (!empty(result.insertId)) {
                                                //     resolve(result.insertId);
                                                // } else {
                                                //     resolve(0);
                                                // }
                                        });
                            } else {
                                resolve(0);
                            }
                    });
        // };
        var returnData = await myReturn();       
        return JSON.stringify(returnData, null, '\t') ;

    } catch (error) {
        return error;
    }
}
var addCardGuide = async function (req, res) {
    try {
        var date_ob = new Date();
        // current date
        var date = ("0" + date_ob.getDate()).slice(-2);
        // current month
        var month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        var year = date_ob.getFullYear();
        // current hours
        var hours = date_ob.getHours();
        // current minutes
        var minutes = date_ob.getMinutes();
        // current seconds
        var seconds = date_ob.getSeconds();

        var upload = multer({ 
            storage:multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, path.join(__dirname,'..','public/picture/img_user/cardGuide/'))
                },
                // dest: 'picture/img_user/', // กำหนดโฟลเดอร์ที่จะเก็บไฟล์
                filename: function (req, file, cb) {
                    let extArr = file.originalname.split('.')
                    let ext = extArr[extArr.length-1]
                    cb(null, 'CG-'+year + month + date + hours + minutes + seconds + '.' + ext)
                }
            }),
            fileFilter:(req, file, cb)=>{
                if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
                    return cb(new Error('เฉพาะไฟล์รูปภาพเท่านั้น!'), false)
                }
                cb(null, true)
            }
            // limits:{
            //     fileSize:2000000 // ขนาดไฟล์ไม่เกิน 2MB
            // }
        }).single('NewImgCard');

        upload(req, res, (error)=>{
            if (error instanceof multer.MulterError || error) {
                res.locals.errors = { "message": error };   
                res.locals.user = req.body;  
                res.render('/mainadmin/listguide');
            }
        })
    } catch (error) {  
        return error;
    }
}
var getIDListGuide = async function (req, res) {
    var { id_Gu } = req.body ;
    var myReturn = () => { 
        return new Promise((resolve, reject) => { 
            sql = "SELECT * FROM guide JOIN cardguide ON guide.id_guide = cardguide.id_guide JOIN districts ON guide.district = districts.district_code WHERE guide.id_guide = ? AND cardguide.cardVisible = 1" ;
            connection.query(sql, [id_Gu], function (error, result, fields) {
                if (error) throw error;
                resolve(result) ;
                // console.log(result);
            });
            
        });
    };
    var data = await myReturn();    
    return JSON.stringify(data,null,'\t') ;
}

module.exports = {listAdmin, addAdmin, getIDListadmin, editAdmin, listGuide, addGuide, getIDListGuide, getTypeCard, getDeailTypeCard, addCardGuide};