'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Navigation = app.model.define('navigation', {
    _id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING(32),
      defaultValue: '',
    },
    url: {
      type: STRING(30),
      defaultValue: '',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'navigation',
  });
  return Navigation;
};
