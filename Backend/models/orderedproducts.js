'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class orderedproducts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  orderedproducts.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    price: DataTypes.BIGINT,
    quantity: DataTypes.INTEGER
  }, {
    createdAt:false,
    updatedAt:false,
    sequelize,
    modelName: 'orderedproducts',
  });
  return orderedproducts;
};