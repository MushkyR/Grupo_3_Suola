
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {check, validationResult, body } = require('express-validator');



const userController = {

   register: function(req, res) {
        res.render('register')
    },

    login: function(req, res){
        res.render('login')
    },
    
   loginUser: function (req, res) {

    
    
            const usersJSON = fs.readFileSync(path.join(__dirname, "../data/userData.json"), "utf-8");
            const users = JSON.parse(usersJSON);
        
            const newUser = {
                id: Date.now(),
                emailLogin: req.body.emailLogin,
                clave: bcryptjs.hashSync(req.body.clave, 10),
            };
        
            users.push(newUser);
        
            const newListUsers = JSON.stringify(users);
        
            fs.writeFileSync(path.join(__dirname, "../data/userData.json"), newListUsers, "utf-8");
        
            res.redirect('/')

       
        let errors = validationResult(req);

        if (errors.isEmpty()){
            let usersJson = fs.writeFileSync(path.join(__dirname, "../data/userData.json"), newListUsers, "utf-8");
            let users;
            if(usersJson == ""){
                users = [];
            } else {
                users = JSON.parse(usersJson)
            }
            for(let i = 0; i < users.length; i ++){
                if (users[i].emailLogin == req.body.emailLogin){
                            if(bcryptjs.compareSync(req.body.clave, users[i].clave)) 
                     usuarioALoguearse = users[i];
                    break;
                }
            }

        if(usuarioALoguearse == undefined) {
           return res.render('./login', {errors: [{msg: "Credenciales invalidas"}
        ]});
        }
        
        req.session.usuarioLogueado == usuarioALoguearse,
        res.render('Success');

        }
    },

    
    

    registrado: function(req, res)
{
    res.render('registrado')
},
        // @POST /user/register
        registerUser: function (req, res) {
            // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
            const usuariosJson = fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8');
            const usuarios = JSON.parse(usuariosJson);
            // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
            const nuevoUsuario = {
                id: Date.now(),
                titulo: req.body.titulo,
                name: req.body.name,
                lastName: req.body.lastName,
                dateBirth: req.body.dateBirth,
                provincia: req.body.provincia,
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password, 10),
                passwordConfirm:  bcryptjs.hashSync(req.body.passwordConfirm, 10),
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
        getUserDetail: function (req, res) {
            const id = req.params.id;
    
            const usuariosJSON = fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf8');
    
            const usuarios = JSON.parse(usuariosJSON);
    
            const usuarioPedido = usuarios.find(usuarioActual => usuarioActual.id == id);
    
            res.render('userDetail', {
                nombre: usuarioPedido.nombre,
                email: usuarioPedido.email,
                img: usuarioPedido.img
            });
        }
    }
    

module.exports = userController