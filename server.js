//require express and path, initialise express and set up port
const express = require('express');
const routes = require('./controller')
const path = require('path');
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
const bcrypt = require("bcrypt");



const app = express();
const PORT = process.env.PORT || 3001;


//middleware to ensure JSON data is parsed correctly
app.use(express.json());
//ensures URLS are encoded correctly
app.use(express.urlencoded({extended: true}));
//ensure static files are served correctly
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "hbs");

app.listen(PORT, ()=> console.log("Now Listening on ${PORT}"));
