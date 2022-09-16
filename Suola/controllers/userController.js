
const fs = require('fs');
const path = require('path');

const userController = {

   register: function(req, res) {
        res.render('register')
    },
    
   login: function (req, res) {
        res.render('login')
    },

        // @POST /user/register
        registerUser: function (req, res) {
            console.log("hola",req)
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
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                phone: req.body.phone
               };
    
            usuarios.push(nuevoUsuario);
    
            const usuariosActualizadosJSON = JSON.stringify(usuarios);
    
            // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
            fs.writeFileSync(path.join(__dirname, '../data/userData.json'), usuariosActualizadosJSON, 'utf8');
           
            res.redirect('/');
            //res.send("Usuario registrado con exito")
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