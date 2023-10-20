"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeTest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.TestMedical,{
        foreignKey: 'TypeTestId'
      });
      this.belongsTo(models.Cabinet, {
        foreignKey: 'CabinetId'
      });

    }
  }
  TypeTest.init(
    {
      titre: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      CabinetId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Cabinets',
          key:'id'
        }
      }
    },
    {
      sequelize,
      modelName: "TypeTest",
    }
  );
  return TypeTest;
};
