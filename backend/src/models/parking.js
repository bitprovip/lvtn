'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Parking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Parking.hasMany(models.User);
      Parking.belongsTo(models.User)
    }
  };
  Parking.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    price: DataTypes.STRING,
    mota: DataTypes.STRING,
    userid: DataTypes.INTEGER,
    status: DataTypes.STRING,
    soluong: DataTypes.INTEGER,
    tc: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Parking',
  });
  return Parking;
};