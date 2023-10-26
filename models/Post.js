const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const dayjs = require('dayjs');

class Post extends Model { }

Post.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  date: {
    type: DataTypes.VIRTUAL,
    get() {
      return dayjs(this.createdAt).format('MM/DD/YYYY hh:mma')
    }
  }
}, {
  modelName: 'user_posts',
  freezeTableName: true,
  sequelize: db
});

module.exports = Post;