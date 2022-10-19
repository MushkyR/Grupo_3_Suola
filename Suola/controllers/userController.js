
const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { runInNewContext } = require('vm');


const userController = {

   register: function(req, res) {
        res.render('register')
    },

    login: function(req, res){
        res.render('login')
    },
    
   loginUser: function (req, res) {

    const usuariosJsonLogin = fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8');
    let userLogin;
    if(usuariosJsonLogin == ""){
        userLogin = [];
    } else {
         userLogin = JSON.parse(usuariosJsonLogin);
    }

    for(let i = 0; i < userLogin.length; i++){
        if(userLogin[i].emailLogin == req.body.emailLogin && bcryptjs.compareSync(req.body.clave, userLogin[i].clave));

    } 
    res.send("Bienvenido")

    
            // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
            const nuevoUsuarioLogin = {
                id: Date.now(),
                emailLogin: req.body.emailLogin,
                clave: bcryptjs.hashSync(req.body.clave, 10),
              
               };
 
            userLogin.push(nuevoUsuarioLogin);
    
            const usuariosActualizadosJSONLogin = JSON.stringify(userLogin);
    
            // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
            fs.writeFileSync(path.join(__dirname, '../data/userData.json'), usuariosActualizadosJSONLogin, 'utf8');
           
            
          
                
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
                phone: req.body.phone
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