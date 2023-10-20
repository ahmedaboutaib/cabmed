"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cabinet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Utilisateur, {
        foreignKey: 'CabinetId' 
      });
      this.hasMany(models.Patient, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.SalleDAttente, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.Depense, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.RendezVous, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.Service, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.TypeTest, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.TypeBilan, {
        foreignKey: 'CabinetId'
      });
      this.hasMany(models.Medicament, {
        foreignKey: 'CabinetId'
      });
    }
  }
  Cabinet.init(
    {
      nom: DataTypes.STRING,
      adresse: DataTypes.STRING,
      tel: DataTypes.STRING,
      email: DataTypes.STRING,
      ville: DataTypes.STRING,
      dateDebut: DataTypes.TIME,
      dateFin: DataTypes.TIME,
      fixe: DataTypes.STRING,
      logo: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Cabinet",
    }
  );
  return Cabinet;
};
