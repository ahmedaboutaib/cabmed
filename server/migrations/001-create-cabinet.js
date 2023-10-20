'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cabinets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nom: {
        type: Sequelize.STRING
      },
      adresse: {
        type: Sequelize.STRING
      },
      tel: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      ville: {
        type: Sequelize.STRING
      },
      fixe: {
        type: Sequelize.STRING
      },
      logo: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      dateDebut:{
        type: Sequelize.TIME,
      },
      dateFin:{
        type: Sequelize.TIME,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cabinets');
  }
};