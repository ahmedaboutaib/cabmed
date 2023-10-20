'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Visites', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    ServiceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Services', 
          key: 'id',
        },
      },
     PaiementId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Paiements', 
          key: 'id',
        },
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Visites');
  }
};