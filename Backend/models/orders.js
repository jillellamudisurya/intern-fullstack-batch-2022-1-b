'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orders.init({
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    driver_id: DataTypes.INTEGER,
    delivered_status: DataTypes.BOOLEAN,
    ordered_at: DataTypes.DATE,
    quantity: DataTypes.INTEGER,
    order_status: DataTypes.INTEGER,
    order_amount: DataTypes.INTEGER
  }, {
    createdAt:false,
    updatedAt:false,
    sequelize,
    modelName: 'orders',
  });
  return orders;
};