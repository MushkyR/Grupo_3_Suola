const express = require('express')

const router = express.Router()

const multer = require('multer');
const path = require('path')


const userController = require('../controllers/userController')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '../public/userPhotos'));
    },

    filename: function(req, file, cb){
       
        cb(null, Date.now() + '-' + path.extname(file.originalname)
        );
    }
});

const upload = multer({storage: storage});

router.get("/register",  userController.register)

router.get("/registrado", userController.registrado)

router.get("/login", userController.login)

router.post('/login', userController.loginUser);

router.get('/detail/:id', userController.getUserDetail);

router.post('/register',upload.single('userPhotos'), userController.registerUser);

module.exports =router;