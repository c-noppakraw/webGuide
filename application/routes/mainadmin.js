var express = require('express');
var router = express.Router();
var { body, validationResult } = require('express-validator');
var controllers = require('../controllers/mainadmin');
var model = require('../model/mainadmin');
var multer  = require('multer');
var path = require('path');

var upload = multer({ 
    storage:multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname,'..','public/picture/img_user/cardGuide/'))
        },
        // dest: 'picture/img_user/', // กำหนดโฟลเดอร์ที่จะเก็บไฟล์
        filename: function (req, file, cb) {
            let extArr = file.originalname.split('.')
            let ext = extArr[extArr.length-1]
            cb(null, Date.now() + '.' + ext)
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

router.get('/', controllers.getHomePage);
router.get('/listadmin', controllers.getListadmin);
router.post('/addAdmin', async function (req, res) {
    var addAdmin = await model.addAdmin(req, res);
    res.send(addAdmin);
});
router.post("/getIDadmin", async function (req, res) {
    var getIDListadmin = await model.getIDListadmin(req, res);
    res.send(getIDListadmin);
});
router.post("/editAdmin", async function (req, res) {
    var editAdmin = await model.editAdmin(req, res);
    res.send(editAdmin);
});
router.post("/getDeailTypeCard", async function (req, res) {
    var getLiseTypeCard = await model.getDeailTypeCard(req, res);
    res.send(getLiseTypeCard);
});
router.get("/listguide", controllers.getListguide);
router.post("/addGuide", async function (req, res) {
    var addGuide = await model.addGuide(req, res);
    // res.send(addGuide);
});
router.post("/addCardGuide", async function (req, res){
    var addCardGuide = await model.addCardGuide(req, res);
    // res.send(addCardGuide);
});
router.post("/getIDGuide", async function (req, res) {
    var getIDListGuide = await model.getIDListGuide(req, res);
    res.send(getIDListGuide);
});
// router.get('/listadmin', controllers.getListadmin, model.listAdmin);

module.exports = router;