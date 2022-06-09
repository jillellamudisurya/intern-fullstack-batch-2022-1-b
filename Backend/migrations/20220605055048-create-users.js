'use strict';

// const roles = require("../models/roles");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING,
        allowNull:false
      },
      email: {
        type: Sequelize.STRING,
        allowNull:false
      },
      phonenumber: {
        type: Sequelize.BIGINT,
        allowNull:false
      },
      password: {
        type: Sequelize.STRING,
        allowNull:false
      },
      role_id: {
        type: Sequelize.INTEGER,
        references:{model:'roles',key:'id'}
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};