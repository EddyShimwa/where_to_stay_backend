'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Properties', [
      {
        description: 'A cozy apartment in a great location',
        price: 1200,
        location: '123 Main St, City',
        image: 'apartment.jpg',
        isAvailable: true,
        number_rooms: 2,
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
  
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Properties', null, {});
  },
};
