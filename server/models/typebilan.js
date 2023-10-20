"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeBilan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Bilan, {
        foreignKey: "TypeBilanId",
      });
      this.belongsTo(models.Cabinet, {
        foreignKey: "CabinetId",
      });

      this.belongsToMany(models.Bilan, { through: models.BilanComposition, foreignKey: 'TypeBilanId' });
    }
  }
  TypeBilan.init(
    {
      titre: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      description: DataTypes.STRING,
      CabinetId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Cabinets",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "TypeBilan",
    }
  );
  return TypeBilan;
};
