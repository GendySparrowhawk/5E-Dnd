const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

Post.belongsTo(User, { foreignKey: 'user_id', as: 'author' });
User.hasMany(Post, { foreignKey: 'user_id' });

Comment.belongsTo(User, { foreignKey: 'user_id', as:'author' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { foreignKey: 'user_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });


module.exports = {
    Post,
    Comment,
    User
};