'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('orderstatuses',[
      {
        id:1,
        status:'pending'
      },
      {
        id:2,
        status:'accept'
      },
      {
        id:3,
        status:'out for delivery'
      },
      {
        id:4,
        status:'delivered'
      },
      {
        id:5,
        status:'rejected'
      }
    ],{})
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('orderstatuses',null,{})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
