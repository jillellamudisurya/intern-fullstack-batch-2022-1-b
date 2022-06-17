'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class driverorders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  driverorders.init({
    driver_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    delivered_status: DataTypes.BOOLEAN
  }, {
    timestamps:false,
    sequelize,
    modelName: 'driverorders',
  });
  return driverorders;
};