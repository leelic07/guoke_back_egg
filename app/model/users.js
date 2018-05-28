'use strict';

module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;
  const Users = app.model.define('users', {
    _id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userName: {
      type: STRING(30),
      defaultValue: '',
      unique: true,
    },
    password: {
      type: STRING(32),
      defaultValue: '',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'users',
  });
  return Users;
};
