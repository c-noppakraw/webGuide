const express = require('express');
const model = require('../model/register')
// const mysql = require('mysql');
// const con = require('../config/db');
const { validationResult } = require('express-validator')
const body = require('body-parser');

const getConditionPage = (req, res) => {
    // res.render('condition');
    res.render('condition', {
      title: 'เงื่อนไขการสมัครสมาชิก',
    });
  };

const getRegisterPage = async function (req, res) {
    // res.render('register');
    res.render('register', {
      title: 'สมัครสมาชิก',
    });
};

const addGuide = async (req, res, next) => {
  data = {
      username:req.body.username,
      password:req.body.password
  };
  console.log(data);
}

// exports.addGuide = async (req, res, next) => {
//     const { name, email, password } = req.body

//     console.log(name);
    
// }

// exports.addGuide = async (req, res, next) => {
//   try {
//       const { name, email, password } = req.body

//       const errorValidation = validationResult(req)
//       if (!errorValidation.isEmpty()) {
//           const error = new Error('please input required information')
//           error.statusCode = 422;
//           error.validation = errorValidation.array();
//           throw error;
//       }

//       const exitmail = await User.findOne({ email: email })
//       if (exitmail) {
//           const error = new Error('this Email is not avaliable')
//           error.statusCode = 403;
//           throw error;
//       }

//       //const user = await User.find();
//       let user = new User
//       user.name = name
//       user.email = email
//       user.password = await user.encryptPassword(password)

//       await user.save()
//       res.status(201).json({
//           data: user
//       })
//   } catch (error) {
//       next(error)
//   }
// }

module.exports = {getConditionPage, getRegisterPage};