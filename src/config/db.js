const { Sequelize } = require('sequelize');
const leadershipKitsModel = require("../models/leadershipKitsModel");

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_SERVER,
  port: process.env.DB_PORT, // Default is 1433 for SQL Server
  dialect: process.env.DB_DIALECT, // 'mssql' for Microsoft SQL Server
  dialectOptions: {
    options: {
      encrypt: false,
      trustServerCertificate: true, // Only for development; should be false in production
    },
  },
});

const db = {};
db.LeadershipKitsModel = leadershipKitsModel(sequelize);

// sync all models with database
sequelize.sync({ alter: true });

module.exports = { db, Sequelize };
