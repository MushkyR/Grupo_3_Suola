const express = require('express')

const router = express.Router()

const multer = require('multer');
const path = require('path')

const { body } = require('express-validator');

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

const validations = [
    body('name').notEmpty().withMessage('Este campo es obligatorio'),
    body('lastName').notEmpty().withMessage('Este campo es obligatorio'),
    body('email').notEmpty().withMessage('Tienes que escribir un email').bail()
    .isEmail().withMessage("Debes escribir un formato de email válido"),
    body('dateBirth').notEmpty().withMessage('Este campo es obligatorio'),
    body('provincia').notEmpty().withMessage('Tienes que elegir una provincia'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña válida')
   .trim().notEmpty().isLength({ min: 6}).withMessage("La contraseña debe tener minimo 6 caracteres"), 
    body('passwordConfirm').notEmpty().withMessage('Tienes que escribir una contraseña válida')
    .trim().custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error('Las contraseñas deben coincidir')
        }
        return true; 
    }),
    body('phone').notEmpty().withMessage('Este campo es obligatorio'),
    body('userPhotos').custom((value, {req}) =>{
        let acceptedExtensions = [".jpg", ".png", ".gif"]
        let file = req.file 
            if (!file){
                throw new Error("Tienes que subir una imagen")
            } else {
                let fileExtension = path.extname(file.originalname)
            
            if(!acceptedExtensions.includes(fileExtension)){
                throw new Error( `Las extensiones de archivo permitidas son ${acceptedExtensions.join(", ")}`)
            }
        }
            
            return true
    })

]

const upload = multer({storage: storage});

router.get("/register", guestMiddleware,  userController.register)

router.get("/registrado", userController.registrado)

router.get("/profile", authMiddleware, userController.profile)

router.get("/login", guestMiddleware, userController.login)

router.post('/login', userController.loginUser);

router.get('/detail/:id', userController.getUserDetail);

router.post('/register',upload.single('userPhotos'), validations, userController.registerUser);

module.exports =router;