var express = require('express');
var router = express.Router();
var empty = require('is-empty');
var model = require('../model/mainadmin');

// var makeSession = async function (req, res) {
//     var session = {
//         'id_admin' : req.session.id_admin,
//         'usernames' : req.session.usernames,
//         'img_admin' : req.session.img_admin,
//         'level_admin' : req.session.level_admin
//     };
//     return session;
//         // if(!empty(req.session.cookie.maxAge)) {
//         // } else {
//         //     delete req.session.id_admin;
//         //     delete req.session.usernames;
//         //     delete req.session.img_admin;
//         //     delete req.session.level_admin;
//         // }
//         // res.redirect('/login');
// }

var getHomePage = async function (req, res) {
    // console.log(req.session);
    var session = {
        'id_admin' : req.session.id_admin,
        'username' : req.session.username,
        'img_admin' : req.session.img_admin,
        'level_admin' : req.session.level_admin
    };
    if(!empty(req.session.cookie.maxAge)) {
        res.render('./theme/backend/themadmin', {
            title: 'หน้าหลัก',
            blog_sidepanel: '',
            blog_heading: '',
            blog_breadcrumb: '',
            page: 'backend/admin/welcome',
            data: '',
            typeCard: '',
            session: session
        });
        // console.log(session);
    } else {
        delete req.session.id_admin;
        delete req.session.username;
        delete req.session.img_admin;
        delete req.session.level_admin;
    }
    res.redirect('/login');
};
var getListadmin = async function (req, res) {
    var dataListAdmin = await model.listAdmin(req, res) ;
    var session = {
        'id_admin' : req.session.id_admin,
        'username' : req.session.username,
        'img_admin' : req.session.img_admin,
        'level_admin' : req.session.level_admin
    };
    if(!empty(req.session.cookie.maxAge)) {
        res.render('./theme/backend/themadmin', {
            title: 'จัดการผู้ดูแล',
            blog_sidepanel: '',
            blog_heading: '',
            blog_breadcrumb: '',
            page: 'backend/admin/listadmin',
            data: dataListAdmin,
            typeCard: '',
            session: session
        });
    } else {
        delete req.session.id_admin;
        delete req.session.username;
        delete req.session.img_admin;
        delete req.session.level_admin;
    }
    res.redirect('/login');
};
var getListguide = async function (req, res) {
    var dataListAdmin = await model.listGuide(req, res) ;
    var typeCard = await model.getTypeCard(req, res);
    var session = {
        'id_admin' : req.session.id_admin,
        'username' : req.session.username,
        'img_admin' : req.session.img_admin,
        'level_admin' : req.session.level_admin
    };
    if(!empty(req.session.cookie.maxAge)) {
        res.render('./theme/backend/themadmin', {
            title: 'จัดการผู้ดูแล',
            blog_sidepanel: '',
            blog_heading: '',
            blog_breadcrumb: '',
            page: 'backend/admin/listguide',
            data: dataListAdmin,
            typeCard: typeCard,
            session: session
        });
    } else {
        delete req.session.id_admin;
        delete req.session.username;
        delete req.session.img_admin;
        delete req.session.level_admin;
    }
    res.redirect('/login');
};
// const addAdmin =  async function (req, res) {
    // if(!empty(req.session.cookie.maxAge)) {
    // } else {
    //     delete req.session.id_admin;
    //     delete req.session.username;
    //     delete req.session.img_admin;
    //     delete req.session.level_admin;
    // }
    // res.redirect('/login');
// };

module.exports = {getHomePage, getListadmin, getListguide}; 