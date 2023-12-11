const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/Database');


class Comment extends Model {
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id', 
    },
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
    modelName: 'comment',

  }
);

module.exports = Post;
