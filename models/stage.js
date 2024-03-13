'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, StageEvent, SetTime }) {
      // define association here
      Stage.belongsToMany(Event, {
        through: StageEvent,
        foreignKey: 'stage_id',
        as: 'events'
      })
      Stage.hasMany(SetTime, {
        foreignKey: 'stage_id',
        as: 'set_times'
      })
    }
  }
  Stage.init({
    stage_id: {
      type: DataTypes.INTEGER, 
      primaryKey: true, 
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false 
    }
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stages',
    timestamps: false
  });
  return Stage;
};