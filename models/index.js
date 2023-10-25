const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

Post.belongsTo(User, { foreignKey: 'user_id' });
User.hasMany(Post, { foreignKey: 'user_id' });


Review.belongsTo(Game, { foreignKey: 'game_id' });
Game.hasMany(Review, { foreignKey: 'game_id' });


module.exports = {
    Post,
    Comment,
    User
};