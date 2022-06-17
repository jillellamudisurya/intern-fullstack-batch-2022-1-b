'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class addresses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  addresses.init({
    user_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    lanlat:DataTypes.STRING
  }, {
    timestamps:false,
    sequelize,
    modelName: 'addresses',
  });
  return addresses;
};