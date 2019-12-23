var express = require('express');
var { body, validationResult } = require('express-validator');
var router = express.Router();

var model = require('../model/login');
var controllers = require('../controllers/login');
router.get('/', controllers.getHomePage);
router.get('/makeSes', controllers.makeSession);
router.post('/chkLogin', [
    body('username').not().isEmpty(),
    body('password').not().isEmpty()
], model.getLoginPage);//ตรงนี้จะเรียกผ่าน model แทน

module.exports = router;
