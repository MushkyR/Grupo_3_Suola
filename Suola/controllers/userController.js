
const userController = {

   register: function(req, res) {
        res.render('register')
    },
    
   login: function (req, res) {
        res.render('login')
    }
    
}

module.exports = userController