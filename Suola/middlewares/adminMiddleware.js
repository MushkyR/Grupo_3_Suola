function adminMiddleware(req, res, next) {

    if (!req.session.userLogged || req.session.userLogged.categoria !== "admin") {
        return res.redirect('/');
    }
    next();
}
module.exports = adminMiddleware;