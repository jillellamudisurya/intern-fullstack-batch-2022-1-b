'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('routes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      route_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'allroutes',
          key: 'id'
        }
      },
      order_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'allorders',
          key:'id'
        }
      },
      address: {
        type: Sequelize.STRING
      },
      flag: {
        type: Sequelize.BOOLEAN
      },
      distance: {
        type: Sequelize.STRING
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('routes');
  }
};