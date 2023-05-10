//require express and path, initialise express and set up port
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

//middleware to ensure JSON data is parsed correctly
app.use(express.json());
//ensures URLS are encoded correctly
app.use(express.urlencoded({extended: true}));
//ensure static files are served correctly
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

app.listen(PORT, ()=> console.log("Now Listening"));
