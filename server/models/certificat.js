"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Certificat extends Model {
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
  Certificat.init(
    {
      type: DataTypes.STRING,
      dateDub: DataTypes.DATEONLY,
      nombre: DataTypes.INTEGER,
      typeTemps: DataTypes.STRING,
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
      modelName: "Certificat",
    }
  );
  return Certificat;
};
