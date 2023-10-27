  const { Model, DataTypes } = require('sequelize');
  const db = require('../config/connection');
  const dayjs = require('dayjs');

  class Comment extends Model { }
// comment model also has date-time added. 
  Comment.init({
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
      modelName: 'post_comments',
      freezeTableName: true,
      sequelize: db
    });

    module.exports = Comment;