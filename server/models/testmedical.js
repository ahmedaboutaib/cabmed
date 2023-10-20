"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TestMedical extends Model {
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
      this.belongsTo(models.TypeTest, {
        foreignKey: 'TypeTestId'
      });
    }
  }
  TestMedical.init(
    {
      desc: DataTypes.STRING,
      dateTest: DataTypes.DATEONLY,
      resultat: DataTypes.JSON,
      TypeTestId: {
        type: DataTypes.INTEGER,
        references:{
          model:'TypeTest',
          key:'id'
        }
      },
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
      modelName: "TestMedical",
    }
  );
  return TestMedical;
};
