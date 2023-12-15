const User = require('./User'); //is this right or do i need ./
const Post = require('./Post');
const Comment = require('./Comment');


// Defined associations 
User.hasMany(Post, { foreignKey: 'user_id'});
Post.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id'});
Comment.belongsTo(User, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id'});
Comment.belongsTo(Post, { foreignKey: 'post_id' });

// Exporting the initialized Sequelize instance / s yeeaaaah make sure order is correct
module.exports = {
  User,
  Post,
  Comment,
};