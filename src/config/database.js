const mysql = require('think-model-mysql');

module.exports = {
  handle: mysql,
  database: 'wxcallme',
  prefix: 'callmewx_',
  encoding: 'utf8mb4',
  host: '127.0.0.1',
  port: '3306',
  user: 'root',
  password: 'aini1314',
  dateStrings: true
};
