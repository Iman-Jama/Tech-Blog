const router = require("express").Router();
const {Blog, Comment, User} = require('../../models');
const withAuth = require('../../utils/withAuth');
  
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.findAll( {
      where: {
        created_by: req.session.user_id
      }
    });
    // console.log(blogs);
    // console.log("this is username" +blogs[0].user.dataValues.username); // assuming 'name' is the attribute for the user's name
    // console.log("this is blog comments" + blogs[0].blog_comments[0]); // this will log the array of blog comments for each blog

    blogs = blogs.map(blog => blog.get({plain: true}))
    console.log(blogs)
    res.render('profile', { blogs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});
  
  // router.post('/', async (req, res) => {
  //   try {
  //     const { title, content, created_by } = req.body;
  //     const blog = await Blog.create({ title, content, created_by });
  //     res.json(blog);

  //   } catch (err) {
  //     console.error(err);
  //     res.status(500).json({ message: 'Server error' });
  //   }
  // });
  

  router.post('/:id/comments', async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id);
      if(!blog){
        res.status(404).json({ message: 'Blog not found' });
        return;
      }
      const { username, comment_text } = req.body;
      if(!username || !comment_text){
        res.status(400).json({ message: 'Username and comment text are required' });
        return;
      }
      const user = await User.findOne({
        where: {username}
      });
      if(!user){
        res.status(404).json({ message: 'User not found' });
        return;
      }
      const comment = await Comment.create({
        user_id: user.id,
        comment_text,
        blog_id: blog.id
      });
      res.redirect(`/blog/${blog.id}`);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

// Create a POST route to handle the form submission
router.post("/", async (req, res) => {
  console.log(req.session)
  try {
    
    const userId = req.session.user_id;

    // Extract the blog details from the request body
    const { title, content } = req.body;

    const newBlog = await Blog.create({
      title,
      content,
      created_by: userId,
    });

    
    const previousBlogs = await Blog.findAll({
      where: { created_by: userId },
    });

    // console.log(previousBlogs);

    // Send a response back to the client with the newly created blog and previous blogs
    res.render("profile", { blogs: previousBlogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while creating the blog post." });
  }
});

  

  module.exports = router;