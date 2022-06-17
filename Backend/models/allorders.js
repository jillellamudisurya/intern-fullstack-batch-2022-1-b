'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allorders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  allorders.init({
    user_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER,
    delivered_status: DataTypes.BOOLEAN,
    ordered_at: DataTypes.DATE,
    order_amout: DataTypes.BIGINT,
    order_status: DataTypes.INTEGER
  }, {
    createdAt:false,
    updatedAt:false,
    sequelize,
    modelName: 'allorders',
  });
  return allorders;
};