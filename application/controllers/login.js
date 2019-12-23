var express = require('express');
var empty = require('is-empty');
/* GET home page. */
const getHomePage = (req, res) => {
    res.render('form_login');
};

var makeSession = async function (req, res) {
    // console.log(req.session);
    // var session = {
    //     'id_admin' : req.session.id_admin,
    //     'usernames' : req.session.usernames,
    //     'img_admin' : req.session.img_admin,
    //     'level_admin' : req.session.level_admin
    // };
    if(!empty(req.session.cookie.maxAge)) {
        // return session;
        res.redirect('/mainadmin');         
    } else {
        delete req.session.id_admin;
        delete req.session.usernames;
        delete req.session.img_admin;
        delete req.session.level_admin;
    }
    res.redirect('/login');
}
module.exports = {getHomePage, makeSession};