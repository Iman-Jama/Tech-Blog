const router = require("express").Router();
const {User, Blog, Comment} = require("../models")
const bcrypt = require("bcrypt");
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      include: [User,{
        model: Comment,
        as: "blog_comments",
        attributes: ['user_id', 'comment_text']
      },
      {
        model: User,
       
        attributes: ['username']
      }],
    });
    console.log(blogs);
    console.log("this is username" +blogs[0].user.dataValues.username); // assuming 'name' is the attribute for the user's name
    console.log("this is blog comments" + blogs[0].blog_comments[0]); // this will log the array of blog comments for each blog

    

    res.render('homepage', { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/login', (req, res) => {
  console.log(req.session.logged_in);
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get("/profile", (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render("profile");
});

router.get("/register", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render("register");
});

module.exports = router;






module.exports = router;