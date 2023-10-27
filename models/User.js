const { DataTypes, Model } = require('sequelize');
const db = require('../config/connection');

const { hash, compare } = require('bcrypt');

class User extends Model { }
// userclass has email and b-crypt to has passewords more securly
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            min: {
                args: 5,
                masg: 'you must enter at least 5 characters'
            },
            max: {
                args: 20,
                msg: 'pair it down shakespear, no more than 20'
            }
        }

    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                args: true,
                msg: 'That is NOT an email.'
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: 6,
                msg: 'Your password must be at least 6 characters in length'
            }
        }
    }
}, {
    modelName: 'user',
    freezeTableName: 'true',
    sequelize: db,
    hooks: {
        async beforeCreate(user) {
            user.password = await hash(user.password, 10)
            return user;
        }
    }
});

User.prototype.validatePass = async function (form_password) {
    const is_vaild = await compare(form_password, this.password);

    return is_vaild;
}

module.exports = User;