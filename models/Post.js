const { Sequelize, DataTypes } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Post extends Sequelize.Model {}

  Post.init({
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
          },
      },
  }, {
      sequelize,
      modelName: 'post',
      freezeTableName: true,
  });

  return Post;
};
