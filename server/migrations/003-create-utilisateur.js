"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Utilisateurs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        type: Sequelize.STRING,
      },
      prenom: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      nomUtil: {
        type: Sequelize.STRING,
      },
      tel: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      pwd: {
        type: Sequelize.STRING,
      },
      CabinetId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cabinets', 
          key: 'id',
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
    await queryInterface.dropTable("Utilisateurs");
  },
};
