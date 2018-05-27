'use strict';

// had enabled by egg
exports.static = true;
// exports.mongoose = {
//   enable: true,
//   package: 'egg-mongoose',
// };

exports.sequelize = {
  enable: true,
  package: 'egg-sequelize',
};

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.passport = {
  enable: true,
  package: 'egg-passport',
};

exports.cors = {
  enable: true,
  package: 'egg-cors',
};

exports.nunjucks = {
  enable: true,
  package: 'egg-view-nunjucks',
};
