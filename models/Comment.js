const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Comment extends Sequelize.Model {}

  Comment.init({
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
          },
      },
  }, {
      sequelize,
      modelName: 'comment',
      freezeTableName: true,
  });

  return Comment;
};
