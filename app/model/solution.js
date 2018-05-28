'use strict';

module.exports = app => {
  // const mongoose = app.mongoose;
  // const Schema = mongoose.Schema;
  // const SolutionSchema = new Schema({
  //   title: { type: String, default: '' }, // 解决方案标题
  //   description: { type: String, default: '' }, // 解决方案描述
  //   url: { type: String, default: '' }, // 解决方案url
  //   imgUrl: { type: String, required: true }, // 图片路径
  //   solutionDetailId: { type: Schema.Types.ObjectId, ref: 'SolutionDetail' }, // 解决方案详情id
  //   createdAt: { type: Date, default: Date.now },
  //   updatedAt: { type: Date, default: Date.now },
  //   sysFlag: { type: Number, default: 1 },
  // }, {
  //   versionKey: false,
  // });
  // return mongoose.model('Solution', SolutionSchema);
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
