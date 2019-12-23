var express = require('express');

// const getConditionPage = (req, res) => {
//     res.render('condition');
//   };

// const getRegisterPage = (req, res) => {
//     res.render('register');
// };

const getPass_userPage = (req, res) => {
    res.render('pass_user');
};

module.exports = {getPass_userPage};