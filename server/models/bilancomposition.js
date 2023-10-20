"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BilanComposition extends Model {

    static associate(models) {
      // define association here
    }
  }
  BilanComposition.init(
    {
      BilanId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Bilans",
          key: "id",
        },
      },
      TypeBilanId: {
        type: DataTypes.INTEGER,
        references: {
          model: "TypeBilans",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "BilanComposition",
    }
  );
  return BilanComposition;
};
