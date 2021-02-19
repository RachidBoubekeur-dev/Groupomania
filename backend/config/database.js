const sequelize = require('sequelize');

module.exports = new sequelize("Groupomania", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});