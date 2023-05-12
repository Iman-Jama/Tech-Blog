const routes = require("express").Router();
const bcrypt = require("bcrypt");


const homeRoutes = require('./homeRoutes');


routes.use('/', homeRoutes);

// Direct users to static files
// This needs to go through the handlebars


module.exports = routes;