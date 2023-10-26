const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

User.hasMany(Post, { as: 'posts', foreignKey: 'author_id' });
Post.belongsTo(User, { as: 'author', foreignKey: 'author_id' });

Comment.belongsTo(User, { foreignKey: 'author_id', as: 'author' });
Comment.belongsTo(Post, { foreignKey: 'post_id' });

User.hasMany(Comment, { as: 'comments', foreignKey: 'author_id' });
Post.hasMany(Comment, { foreignKey: 'post_id' });

module.exports = {
    Post,
    Comment,
    User
};