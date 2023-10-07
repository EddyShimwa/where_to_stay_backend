// In your user-seed.js file

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    const users = [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phoneNumber: '1234567890',
        image: null,
        role: 'landlord',
        password: 'pass12', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phoneNumber: '9876543210',
        image: null,
        role: 'student',
        password: 'pass12', 
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      
    ];

    await queryInterface.bulkInsert('users', users, {});
  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.bulkDelete('users', null, {});
  },
};
