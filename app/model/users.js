'use strict';

module.exports = app => {
  const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
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
    createdAt: {
      type: DATE,
      defaultValue: NOW,
    },
    updatedAt: {
      type: DATE,
      defaultValue: NOW,
    },
    sysFlag: {
      type: INTEGER,
      defaultValue: 1,
    },
  });
  return Users;
};
