//require express and path, initialise express and set up port
const express = require('express');
const path = require('path');
const exphbs = require("express-handlebars");
const session = require("express-session")

const bcrypt = require("bcrypt");

const SequelizeStore = require("connect-session-sequelize")(session.Store);

const helpers = require("./utils/helper");


const routes = require('./controller');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({helpers});

//set up session
const sess = {
  secret: "Super secret secret",
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: "strict"
  },
  resave:false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

//make sure we use the the session
app.use(session(sess));

// Set Handlebars as the default template engine.
app.engine("handlebars", hbs.engine);
app.set("view engine", "hbs");

//middleware to ensure JSON data is parsed correctly
app.use(express.json());
//ensures URLS are encoded correctly
app.use(express.urlencoded({extended: true}));
//ensure static files are served correctly
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
