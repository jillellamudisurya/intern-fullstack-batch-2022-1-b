'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class allroutes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  allroutes.init({
    driver_id: DataTypes.INTEGER,
    visited_status: DataTypes.BOOLEAN
  }, {
    timestamps:false,
    sequelize,
    modelName: 'allroutes',
  });
  return allroutes;
};