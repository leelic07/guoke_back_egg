'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Information = app.model.define('information', {
    _id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    company: {
      type: STRING(32),
      defaultValue: '',
    },
    shareCode: {
      type: STRING(30),
      defaultValue: '',
    },
    address: {
      type: STRING(64),
      defaultValue: '',
    },
    tel: {
      type: STRING(30),
      defaultValue: '',
    },
    fax: {
      type: STRING(30),
      defaultValue: '',
    },
    email: {
      type: STRING(30),
      defaultValue: '',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'information',
  });
  return Information;
};
