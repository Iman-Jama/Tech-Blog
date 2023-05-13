const User = require("./User");
const Comment = require("./Comment");
const Blog = require("./Blog");

User.hasMany(Blog, {
  as: "user_blogs",
  foreignKey: "created_by",
});

User.hasMany(Comment, {
  as: "user_comments",
  foreignKey: "user_id",
});

Blog.hasMany(Comment, {
    as: "blog_comments",
    foreignKey: "blog_id",
  });

Blog.belongsTo(User, {
  foreignKey: "created_by",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
    foreignKey: "blog_id",
    onDelete: "CASCADE",
  });

module.exports = { User, Blog, Comment };
