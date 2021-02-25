const sequelize = require('sequelize');
// Connexion a la base de donner
module.exports = new sequelize("Groupomania", "root", "root", {
    dialect: "mysql",
    host: "localhost"
});