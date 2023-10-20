"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Paiement extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Patient, {
        foreignKey: 'PatientId'
      });
      this.belongsToMany(models.Service, { through: models.Visite });
    }
  }
  Paiement.init(
    {
      date: DataTypes.DATEONLY,
      status: DataTypes.STRING,
      description: DataTypes.STRING,
      prix: DataTypes.DOUBLE,
      methode: DataTypes.STRING,
      PatientId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Patients',
          key:'id'
        }
      },
    },
    {
      sequelize,
      modelName: "Paiement",
    }
  );
  return Paiement;
};
