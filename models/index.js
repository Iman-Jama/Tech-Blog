const User = require("./User");
const Comment = require("./Comment");
const Blog = require("./Blog");

User.hasMany(Blog, {
  as: "user_blogs",
  foreignKey: "created_by",
});

User.hasMany(Comment, {
  as: "user_comments",
  foreignKey: "username",
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
  foreignKey: "username",
  onDelete: "CASCADE",
});

Comment.belongsTo(Blog, {
    foreignKey: "blog_id",
    onDelete: "CASCADE",
  });

module.exports = { User, Blog, Comment };
