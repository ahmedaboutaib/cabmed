'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visite.init({
    status: DataTypes.STRING,
      PaiementId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Paiements',
          key:'id'
        }
      },
     ServiceId: {
        type: DataTypes.INTEGER,
        references:{
          model:'Services',
          key:'id'
        }
      }
  }, {
    sequelize,
    modelName: 'Visite',
  });
  return Visite;
};