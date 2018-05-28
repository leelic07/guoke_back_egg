'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Banners = app.model.define('banners', {
    _id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(32),
      defaultValue: '',
    },
    description: {
      type: STRING(255),
      defaultValue: '',
    },
    url: {
      type: STRING(25),
      defaultValue: '',
    },
    imgUrl: {
      type: STRING(64),
      defaultValue: '',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'banners',
  });
  return Banners;
};
