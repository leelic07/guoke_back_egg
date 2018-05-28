'use strict';

module.exports = app => {
  const { INTEGER, STRING } = app.Sequelize;
  const SolutionDetail = app.model.define('solutionDetail', {
    _id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(32),
      defaultValue: '',
    },
    introduction: {
      type: STRING(255),
      defaultValue: '',
    },
    constitute: {
      type: STRING(255),
      defaultValue: '',
    },
    technology: {
      type: STRING(255),
      defaultValue: '',
    },
  }, {
    timestamps: true,
    paranoid: true,
    underscored: false,
    tableName: 'solutionDetails',
  });
  SolutionDetail.associate = () => {
    SolutionDetail.belongsTo(app.model.Solution, { foreignKey: 'solutionId', onDelete: 'CASCADE', constraints: false });
  };
  return SolutionDetail;
};
