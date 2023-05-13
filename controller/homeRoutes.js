const router = require("express").Router();
const {User, Blog, Comment} = require("../models")
const bcrypt = require("bcrypt");
const withAuth = require('../utils/withAuth');

router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{
        model: Comment,
        as: "blog_comments",
        attributes: ["username", "comment_text"]
      }]
    });
    const blogs = blogData.map((blog) => blog.get({ plain: true }));
    res.render("homepage", {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
      console.log(error);
      // res.status(500).send("Internal server error");
    }
    
});


router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
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