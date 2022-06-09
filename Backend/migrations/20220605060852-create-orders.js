'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{model:'users',key:'id'}
      },
      product_id: {
        type: Sequelize.INTEGER,
        references:{model:'products',key:'id'}
      },
      delivered_status: {
        type: Sequelize.BOOLEAN
      },
      driver_id: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};