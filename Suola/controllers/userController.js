
const userController = {

   register: function(req, res) {
        res.render('register')
    },
    
   login: function (req, res) {
        res.render('login')
    },

        // @POST /user/register
        registerUser: function (req, res) {
            console.log(req.file)
            // Paso 1: importamos el array de usuarios ya existente y lo traducimos a JS
            const usuariosJson = fs.readFileSync(path.join(__dirname, '../data/userData.json'), 'utf-8');
            const usuarios = JSON.parse(usuariosJson);
            // Paso 2: creamos el objeto del nuevo usuario, lo agregamos al array y lo traducimos a JSON
            const nuevoUsuario = {
                id: Date.now(),
                nombre: req.body.name,
                email: req.body.email,
                contraseña: req.body.password,
                img: './profilePhotos/' + req.file.filename
            };
    
            usuarios.push(nuevoUsuario);
    
            const usuariosActualizadosJSON = JSON.stringify(usuarios);
    
            // Paso 3: cargamos el nuevo array al json con el fs.writeFileSync()
            fs.writeFileSync(path.join(__dirname, '../data/userData.json'), usuariosActualizadosJSON, 'utf8');
    
            res.redirect('/user/detail/' + nuevoUsuario.id);
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