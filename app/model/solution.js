'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const Solutions = app.model.define('solutions', {
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
      type: STRING(30),
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
    tableName: 'solutions',
  });
  Solutions.associate = () => {
    Solutions.hasOne(app.model.SolutionDetail, { foreignKey: 'solutionId', onDelete: 'CASCADE', constraints: false });
  };

  return Solutions;
};
