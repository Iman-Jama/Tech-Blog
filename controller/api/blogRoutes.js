const router = require("express").Router();
const {Blog, Comment, User} = require('../../models');
const withAuth = require('../../utils/withAuth');
  
  
  router.post('/', async (req, res) => {
    try {
      const { title, content, created_by } = req.body;
      const blog = await Blog.create({ title, content, created_by });
      res.json(blog);

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

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

  
  

  module.exports = router;