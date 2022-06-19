'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',[
      {
        id:1,
        name:'surya',
        email:'surya@gmail.com',
        phonenumber:9398612750,
        password:'Surya123',
        role_id:1
      },
      {
        id:2,
        name:'user1',
        email:'user1@gmail.com',
        phonenumber:7894561235,
        password:'User1',
        role_id:3
      },
      {
        id:3,
        name:'Driver1',
        email:'driver1@gmail.com',
        phonenumber:1478526935,
        password:'Driver1',
        role_id:2
      },
      {
        id:4,
        name:'user2',
        email:'user2@gmail.com',
        phonenumber:7894561456,
        password:'User2',
        role_id:3
      },
      {
        id:5,
        name:'Driver2',
        email:'driver2@gmail.com',
        phonenumber:1438526935,
        password:'Driver2',
        role_id:2
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
    await queryInterface.bulkDelete('users',null,{})
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
