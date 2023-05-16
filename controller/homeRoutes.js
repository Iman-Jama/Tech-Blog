const router = require("express").Router();
const {User, Blog, Comment} = require("../models")
const bcrypt = require("bcrypt");
const withAuth = require('../utils/withAuth');

router.get('/', async (req, res) => {
  try {
    const blogsData = await Blog.findAll({
      include: [{
        model: Comment,
        as: "blog_comments",
        attributes: ['user_id', 'comment_text']
      },
      {
        model: User,
       
        attributes: ['username']
      }],
    });
    // console.log(blogs);
    // console.log("this is username" +blogs[0].user.dataValues.username); // assuming 'name' is the attribute for the user's name
    // console.log("this is blog comments" + blogs[0].blog_comments[0]); // this will log the array of blog comments for each blog
    // const blogs = blogsData.map(blog => blog.get({plain:true}));
    
    // console.log(blogs)
    res.render('homepage', { blogsData });
    // res.status(200).json(blogsData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [{
        model: Comment,
        as: "blog_comments",
        attributes: ['user_id', 'comment_text']
      },
      {
        model: User,
        attributes: ['username']
      }],
    });

    const blog = blogData.get({plain: true}); 
   console.log(blog);

    res.render('blogs', { 
      ...blog,
      logged_in: req.session.logged_in 
    });   

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/login', (req, res) => {
  // console.log(req.session.logged_in);
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

router.get("/profile", async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/');
    return;
  }
  const blogs = await Blog.findAll( {
    where: {
      created_by: req.session.user_id
    }
  });
  console.log(blogs)
  res.render("profile", {blogs});
});

// router.get('/profile', async (req, res) => {
//   try {
//     const userData = await User.findByPk(req.body.username, {
      
//       attributes: { exclude: ['password'] },
//       include: [{ model: Blog }],
//     });
//     console.log("this is the " + userData)

//     if (!userData) {
//       res.status(400).json({ message: "User does not exist" });
//       return;
//     }

//     const validPassword = bcrypt.compareSync(req.body.password, userData.password);
//     if (!validPassword) {
//       res.status(400).json({ message: "Incorrect password" });
//       return;
//     }

//     req.session.save(() => {
//       res.render('profile', { 
//         user: {
//           ...userData.get({ plain: true }),
//           logged_in: true,
//         }
//       });
//     });

//   } catch (error) {
//     res.status(400).json(error);
//   }
// });

router.get("/register", (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render("profile");
});

module.exports = router;
