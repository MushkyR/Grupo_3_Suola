const express = require('express')

const router = express.Router()

const multer = require('multer');
const path = require('path')

const { body } = require('express-validator');

const registerValidations = [
    body('email').isEmail().withMessage("Email invalido"), 
    body('password').isLength({min:8}).withMessage("la contrasena debe tener minimo 8 caracteres")
];

//const loginValidations = ;

const userController = require('../controllers/userController');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware')

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

router.get("/register", guestMiddleware,  userController.register)

router.get("/registrado", userController.registrado)

router.get("/profile", authMiddleware, userController.profile)

router.get("/login", guestMiddleware, userController.login)

router.post('/login', userController.loginUser);

router.get('/detail/:id', userController.getUserDetail);

router.post('/register',upload.single('userPhotos'), userController.registerUser);

module.exports =router;