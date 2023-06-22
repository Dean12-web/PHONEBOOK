'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Apis', [{
      name: 'yudi',
      phone: '082387893094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'rifqi',
      phone: '082387893024',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'gema',
      phone: '082387893093',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'fahmi',
      phone: '082387823094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'gilang',
      phone: '081287893094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'yurza',
      phone: '085287893094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'ian',
      phone: '082182893094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'john doe',
      phone: '082287893094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'magic',
      phone: '082382893094',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      name: 'pele',
      phone: '081387823094',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Apis', null, {});
  }
};
