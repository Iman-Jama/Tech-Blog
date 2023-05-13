//helper function to see if the user is logged in and if not they will be re-directed to log in
const withAuth = (req, res, next) => {
    if(!req.session.logged_in){
        res.redirect("/login");
    }
    next();
};

module.exports = withAuth;