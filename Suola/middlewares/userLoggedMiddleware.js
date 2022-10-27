const fs = require('fs');
const path = require('path');

function userLoggedMiddleware (req, res, next) {

    res.locals.isLogged = false;

    let emailInCookie = req.cookies.userEmail;
    const usersJSON = fs.readFileSync(path.join(__dirname, "../data/userData.json"), "utf-8");
    const users = JSON.parse(usersJSON);

    let userFromCookie = users.find(oneUser => oneUser['email'] === emailInCookie);

    if (userFromCookie) {
        req.session.userLogged = userFromCookie;
    } 

    if (req.session.userLogged) {
        res.locals.isLogged = true;
        res.locals.userLogged = req.session.userLogged;
    }

    next();

}


module.exports = userLoggedMiddleware;