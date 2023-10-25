const { Model, DataTypes } = require('sequelize');
const db = require('../config/connection');

const dayjs = require('dayjs');

class Post extends Model { }

Post.init({
  text: {
    type: DataTypes.STRING,
    validate: {
      len: {
        args: 3,
        msg: 'you have more opinions than that , be true to yourself'
      }
    }
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