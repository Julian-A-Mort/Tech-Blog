const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/Database');


class Post extends Model {
}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id', 
      }
    }
  },
  {
    sequelize,
    freezeTableName: true,
    modelName: 'post',

  }
);

module.exports = Post;
