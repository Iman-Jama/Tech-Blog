const router = require("express").Router();
const {Blog, Comment, User} = require('../../models');

router.get('/', async (req, res) => {
    try {
      const blogs = await Blog.findAll({
        include: [{
          model: Comment,
          as: "blog_comments",
          attributes: ['user_id', 'comment_text']
        }],
      });
      res.json(blogs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

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
        res.json(blog);
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
      const { user_id, comment_text } = req.body;
      const blog = await Blog.findByPk(req.params.id);
      if (!blog) {
        return res.status(404).json({ message: 'Blog not found' });
      }
      const comment = await Comment.create({ user_id, comment_text, blog_id: blog.id });
      res.json(comment);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router;