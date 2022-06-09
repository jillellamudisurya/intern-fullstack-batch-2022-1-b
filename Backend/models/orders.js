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
    delivered_status: DataTypes.BOOLEAN,
    driver_id: DataTypes.INTEGER
  }, {
    timestamps:false,
    sequelize,
    modelName: 'orders',
  });
  return orders;
};