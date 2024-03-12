'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stage, StageEvent, MeetGreet, Set_Time }) {
      // define association here
      Event.belongsToMany(Stage, {
        through: StageEvent,
        foreignKey: 'event_id',
        as: 'stages'
      })
      Event.hasMany(MeetGreet, {
        foreignKey: 'event_id',
        as: 'meet_greets'
      })
      Event.hasMany(Set_Time, {
        foreignKey: 'event_id',
        as: 'set_times'
      })
    }
  }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Event',
    tableName: 'event',
    timestamps: false
  });
  return Event;
};