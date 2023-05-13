const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection.js");

class Comment extends Model {}

Comment.init(
  {
    // defines the columns
    comment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "user",
        key: "id",
      },
    },
    comment_text: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_created: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW

    },
    blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "blog",
            key: "id",
          },

    }

  },

  {
    hooks: {
      // beforeCreate: async (newUserData) => {
      //   newUserData.password = await bcrypt.hash(newUserData.password, 10);
      //   return newUserData;
      // },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
