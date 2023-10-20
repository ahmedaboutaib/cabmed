'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('BilanCompositions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      BilanId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Bilans",
          key: "id",
        },
      },
      TypeBilanId: {
        type: Sequelize.INTEGER,
        references: {
          model: "TypeBilans",
          key: "id",
        },
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
    await queryInterface.dropTable('BilanCompositions');
  }
};