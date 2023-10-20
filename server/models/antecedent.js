"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Antecedent extends Model {
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
  Antecedent.init(
    {
      nom: DataTypes.STRING,
      desc: DataTypes.STRING,
      date: DataTypes.DATEONLY,
      status: DataTypes.STRING,
      traitement: DataTypes.STRING,
      PatientId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Patients',
          key:'id'
        }
      }
    },
    {
      sequelize,
      modelName: "Antecedent",
    }
  );
  return Antecedent;
};
