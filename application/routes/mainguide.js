var express = require('express');
var router = express.Router();

var controllers = require('../controllers/mainguide');
router.get('/', controllers.getHomePage);
router.get('/tour_list', controllers.getTour_listPage);
router.get('/cardguide_list', controllers.getCardguide_Page);
router.get('/edit_profile', controllers.getEdit_profilePage);
router.get('/inbox', controllers.getInboxPage);

module.exports = router;
