var express = require('express');
var router = express.Router();

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render('reset');
// });

var controllers = require('../controllers/reset');
router.get('/pass_user', controllers.getPass_userPage);

// router.get('/pass_user', function(req, res, next) {
//   res.render('pass_user')
// });

module.exports = router;
