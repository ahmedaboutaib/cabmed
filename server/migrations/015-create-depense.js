"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Depenses", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      label: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      montant: {
        type: Sequelize.DOUBLE,
      },
      CabinetId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Cabinets",
          key: "id",
        },
      },
      UtilisateurId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Utilisateurs",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Depenses");
  },
};
