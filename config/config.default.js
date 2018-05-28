'use strict';
const path = require('path');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524993676801_8724';

  // add your config here
  config.middleware = [ 'verify' ];

  // mongodb
  // config.mongoose = {
  //   client: {
  //     url: 'mongodb://127.0.0.1/guoke',
  //     options: {},
  //   },
  //   app: true,
  // };

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'guoke',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: '',
  };

  // session
  config.session = {
    key: 'EGG_SESS',
    maxAge: 1 * 3600 * 1000, // 1小时
    httpOnly: true,
    encrypt: true,
  };

  // csrf security
  config.security = {
    csrf: {
      // 判断是否需要 ignore 的方法，请求上下文 context 作为第一个参数
      ignore: ctx => ctx.ip === '127.0.0.1' || 'localhost',
    },
    domainWhiteList: [
      'http://localhost:8081',
      'http://localhost:8080',
      'http://localhost:3000',
      'http://10.10.10.208:3000',
      'http://localhost:7001',
      'http://10.10.10.208:7001',
      'http://120.79.67.25:3000',
    ],
  };

  config.cors = {
    credentials: true,
  };

  config.view = {
    // 如果还有其他模板引擎，需要合并多个目录
    defaultViewEngine: 'nunjucks',
    defaultExtension: '.html',
    root: path.join(appInfo.baseDir, 'app/assets'),
    mapping: {
      '.js': 'nunjucks',
      '.html': 'nunjucks',
    },
  };

  config.cluster = {
    listen: {
      port: 7002,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
    },
  };

  config.swagger = {
    enable: true,
    mountPath: '/test-mount', // swagger-ui  address  <domain>/test-mount
    swaggerFilePath: '/test-swagger.json', // swagger file default path
    enableGoogleFont: false,
  };

  return config;
};
