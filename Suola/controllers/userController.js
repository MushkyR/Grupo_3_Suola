
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {  validationResult } = require('express-validator');



const userController = {

    register: function (req, res) {
        res.render('register')
    },

    logout: function (req, res) {
        res.clearCookie('userEmail');
        req.session.destroy();
        return res.redirect('/user/login') 
    },

    login: function (req, res) {
        res.render('login')
    },

    loginUser: function (req, res) {

        const usersJSON = fs.readFileSync(path.join(__dirname, "../data/userData.json"), "utf-8");
        const users = JSON.parse(usersJSON);

        let userFound = users.find(oneUser => oneUser['email'] === req.body.emailLogin);

        if (userFound) {
            let correctPassword = bcryptjs.compareSync(req.body.clave, userFound.password);
            if (correctPassword) {
                delete userFound.password;
                req.session.userLogged = userFound;

                if(req.body.remember_user){
                    res.cookie('userEmail', req.body.emailLogin, { maxAge: 86400 * 1000 })
                }

                return res.redirect('profile');
            }

            return res.render('login', {
                errors: {
                    email: {
                        msg: 'El email o Password son incorrectos'
                    }
                }
            });
        }

        return res.render('login', {
            errors: {
                email: {
                    msg: 'Este email no esta registrado'
                }
            }
        });

    },

    registrado: function (req, res) {
        res.render('registrado')
    },

    profile: function (req, res) {

        return res.render('profile', {
            user: req.session.userLogged
        });
    },

    // @POST /user/register
    registerUser: function (req, res) {

        const resultValidation = validationResult(req);

        if (resultValidation.errors.length > 0){
            res.render('register', {
                errors: resultValidation.mapped(),
                oldData: req.body
            })
        }
        // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
        const usuariosJson = fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8');
        const usuarios = JSON.parse(usuariosJson);
        // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
        const nuevoUsuario = {
            id: Date.now(),
            titulo: req.body.titulo,
            name: req.body.name,
            lastName: req.body.lastName,
            categoria: req.body.categoria,
            dateBirth: req.body.dateBirth,
            provincia: req.body.provincia,
            email: req.body.email,
            password: bcryptjs.hashSync(req.body.password, 10),
            passwordConfirm: bcryptjs.hashSync(req.body.passwordConfirm, 10),
            phone: req.body.phone,
            userPhoto: '/userPhotos/' + req.file.filename
        };


        usuarios.push(nuevoUsuario);

        const usuariosActualizadosJSON = JSON.stringify(usuarios);

        // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
        fs.writeFileSync(path.join(__dirname, '../data/userData.json'), usuariosActualizadosJSON, 'utf8');

        res.redirect("./registrado");

    },

    // @GET /user/detail
    /*getUserDetail: function (req, res) {
        const id = req.params.id;

        const usuariosJSON = fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf8');

        const usuarios = JSON.parse(usuariosJSON);

        const usuarioPedido = usuarios.find(usuarioActual => usuarioActual.id == id);

        res.render('userDetail', {
            nombre: usuarioPedido.nombre,
            email: usuarioPedido.email,
            img: usuarioPedido.img
        });
    }*/

}


module.exports = userController