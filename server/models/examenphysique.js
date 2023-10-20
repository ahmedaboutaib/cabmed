"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ExamenPhysique extends Model {
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
    }
  }
  ExamenPhysique.init(
    {
      poids: DataTypes.DOUBLE,
      taille: DataTypes.DOUBLE,
      temperature: DataTypes.DOUBLE,
      pression_arterielle: DataTypes.DOUBLE,
      clycemine: DataTypes.DOUBLE,
      notes: DataTypes.STRING,
      pouls: DataTypes.DOUBLE,
      dateExPh: DataTypes.DATEONLY,
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
      modelName: "ExamenPhysique",
    }
  );
  return ExamenPhysique;
};
