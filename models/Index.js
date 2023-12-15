const Sequelize = require('sequelize');
require('dotenv').config();

// Create a Sequelize instance
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    logging: false
  }
);

const User = require('./User')(sequelize, Sequelize.DataTypes);
const Post = require('./Post')(sequelize, Sequelize.DataTypes);
const Comment = require('./Comment')(sequelize, Sequelize.DataTypes);



// Defined associations 
User.hasMany(Post, { foreignKey: 'user_id'});
Post.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id'});
Comment.belongsTo(User, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id'});
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// Exporting the initialized Sequelize instance / s yeeaaaah make sure order is correct
module.exports = {
  sequelize,
  User,
  Post,
  Comment,
};