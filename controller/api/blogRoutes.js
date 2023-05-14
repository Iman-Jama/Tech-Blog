const router = require("express").Router();
const {Blog, Comment, User} = require('../../models');


  router.get('/:id', async (req, res) => {
    try {
      const blog = await Blog.findByPk(req.params.id, {
        include: [{
          model: Comment,
          as: "blog_comments",
          attributes: ['user_id', 'comment_text']
        }],
      });
      if(blog){
        res.render('blogs', { blog });
      } else {
        res.status(404).json({ message: 'Blog not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
  
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
      const { user_id, comment_text } = req.body;
      if(!user_id || !comment_text){
        res.status(400).json({ message: 'User ID and comment text are required' });
        return;
      }
      const comment = await Comment.create({
        user_id,
        comment_text,
        blog_id: blog.id
      });
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  module.exports = router;