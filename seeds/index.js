
const sequelize = require('../config/connection');
const { User, Comment, Blog } = require('../models');

const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // create users and get the user ids
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });
  const userIds = users.map(user => user.id);

  // create blogs and associate them with users
  for (const blog of blogData) {
    const userIndex = Math.floor(Math.random() * userIds.length);
    const userId = userIds[userIndex];
    await Blog.create({
      ...blog,
      user_id: userId
    });
  }

  // create comments and associate them with users and blogs
  for (const comment of commentData) {
    const userIndex = comment.username - 1; // usernames are 1-based indices
    const userId = userIds[userIndex];
    await Comment.create({
      ...comment,
      user_id: userId
    });
  }

  process.exit(0);
};

seedDatabase();
