'use strict';

const fs = require('fs');
const path = require('path');
const {Sequelize, Model} = require('sequelize');
const basename = path.basename(__filename);
const db = {};

const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env. DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  logging: false,
  pool: {
    max: 10,
    min: 0,
    idle: 300000,
    acquire: 300000
  },
  define: {
    timestamps: true,
    underscored: true
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

Model.findOrFail = async function(pk) {
  const instance = await this.findByPk(pk, {});
  if (instance === null)
    throw { message: "This resource does not exist", statusCode: 404 }
  else return instance;
}

db.connect = () => {
  return sequelize.authenticate().then(() => {
    console.log('Database connection has been established successfully.');
  }).catch(err => {
    console.error('Unable to connect to the database:', err);
  });
}

db.reset = () => {
  return sequelize.sync({ force: true }).then(() => {
    console.log("Database was reset successfully");
  }).catch(err => {
    console.error('Unable to reset database:', err);
  })
}

module.exports = db;

