const routes = require("express").Router();
const User = require('../models/User');
const bcrypt = require("bcrypt");

//To get the homepage
routes.get("/", (req, res) => {
    res.render("index")
});

//To get the register page
routes.get("/register", (req, res) => {
    res.render("register")
});

//To post to the register route
routes.post("/auth/register", async (req, res) => {    
    const { name, email, password, password_confirm } = req.body;
  
    try {
      const user = await User.findOne({
        where: { email: email }
      });
  
      if (user) {
        return res.render('register', {
          message: 'This account already has a user!'
        });
      }
  
      if (password !== password_confirm) {
        return res.render('register', {
          message: 'Passwords do not match!'
        });
      }
  
      // Create the new user
      const newUser = await User.create({
        name: name,
        email: email,
        password: password
      });
  
      // Redirect to a success page
      res.status(200).json({ message: 'Registration successful!' });
      
    } catch (error) {
      console.error(error);
      res.render('error', {
        message: 'An error occurred during registration.'
      });
    }
  });
  

//To get the login page:
routes.get("/login", (req, res) => {
    res.render("login")
})

module.exports = routes;