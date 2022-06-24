'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  routes.init({
    route_id: DataTypes.INTEGER,
    order_id: DataTypes.INTEGER,
    address: DataTypes.STRING,
    flag: DataTypes.BOOLEAN,
    distance: DataTypes.STRING
  }, {
    timestamps:false,
    sequelize,
    modelName: 'routes',
  });
  return routes;
};