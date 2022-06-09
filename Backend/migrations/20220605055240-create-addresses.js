'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
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
      hno: {
        type: Sequelize.STRING
      },
      village: {
        type: Sequelize.STRING
      },
      mandal: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      pincode: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('addresses');
  }
};