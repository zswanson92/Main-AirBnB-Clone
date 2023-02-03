'use strict';
const bcrypt = require('bcryptjs/dist/bcrypt');
const {
  Model, Validator
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject(){
      const { id, username, email} = this;
      return { id, username, email};
    }
    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }
    static async login({ credential, password }){
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id)
      }
    }
    static async signup({ username, email, password, firstName, lastName }){
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
        firstName,
        lastName
      });
      return await User.scope('currentUser').findByPk(user.id)
    }
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot,
        { foreignKey: 'ownerId', hooks: true }
      ),
      User.hasMany(
        models.Booking,
        { foreignKey: 'userId', hooks: true }
      ),
      User.hasMany(
        models.Review,
        { foreignKey: 'userId', hooks: true }
      )
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(value){
          if(Validator.isEmail(value)) {throw new Error("Cannot be an email.");
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      }
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt']
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] }
      },
      loginUser: {
        attributes: {}
      }
    }
  });
  return User;
};
