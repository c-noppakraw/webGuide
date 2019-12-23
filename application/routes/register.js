var express = require('express');
var router = express.Router();
var controllers = require('../controllers/register');
var model = require('../model/register');
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
}).single('filesAdd');

router.get('/condition', controllers.getConditionPage);
router.get('/', controllers.getRegisterPage);
router.post('/getProvinces', async function (req, res) {
    var getLiseProvinces = await model.listDistricts(req, res);
    res.send(getLiseProvinces);
});
router.post('/getAmphoes', async function (req, res) {
    var getLiseAmphoes = await model.getAmphoes(req, res);
    res.send(getLiseAmphoes);
});
router.post('/getDistrict', async function (req, res) {
    var getLiseDistrict = await model.getDistrict(req, res);
    res.send(getLiseDistrict);
});
router.post('/getZipcode', async function (req, res) {
    var getLiseZipcode = await model.getZipcode(req, res);
    res.send(getLiseZipcode);
});
router.post('/addPic', async function (req, res, next ) {
    upload(req, res, (error)=>{
        if (error instanceof multer.MulterError || error) {
            res.locals.errors = { "message": error }   
            res.locals.user = req.body  
            return res.render('/register')      
        }
        console.log(req.file);
    })
});
// router.post('/addPic', async function (req, res) {
//     console.log(req.files);
// });
// router.post('/addGuide', 
// // [
// //     body('username','กรุณาใส่ Username').not().isEmpty(),
// //     body('password', 'กรุณาใส่ Password').not().isEmpty()
// // ],
// controllers.addGuide);

module.exports = router;
