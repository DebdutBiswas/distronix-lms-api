const { readFileSync } = require('fs');
const { Sequelize } = require('sequelize');

const { dbHost, dbPort, dbType, dbUser, dbPassword, dbDatabase } = JSON.parse(readFileSync('./configs/dbCreds.json'));

module.exports = new Sequelize(dbDatabase, dbUser, dbPassword, {
  host: dbHost,
  port: +dbPort,
  dialect: dbType,
  dialectOptions: {
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 20000
    }
  }
});