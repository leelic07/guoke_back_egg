'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Introduction = app.model.define('introduction', {
    _id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(32),
      defaultValue: '',
    },
    content: {
      type: STRING(255),
      defaultValue: '',
    },
    images: {
      type: STRING(64),
      defaultValue: '',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'introduction',
  });
  return Introduction;
};
