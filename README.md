Groupomania

Pour faire fonctionner l'application en local, il faut installer:

Dans le dossier backend: express, express-rate-limit, body-parser, helmet, jsonwebtoken, crypto-js, bcrypt, sequelize, mysql2, nodemon et sqlite3.

Dans le dossier frontend: installez vue 3 avec vuex et sass, vue-router, axios, vue-axios, tinymce-vue.

Vous aurez besoin d'une base de données pour stocker vos données comme MySQL avec WAMP ou un autre logiciel selon votre système d'exploitation.

Vous pouvez modifier la configuration de connexion de l'application à votre base de données dans le fichier backend\config\database.js

Pour lancer l'application:

Pour activer le backend vous devez accéder au dossier: \backend 
Et entrer la commande: nodemon serve

Pour le frontend vous devez accéder au dossier: \frontend\my-vue-app
Et entrer la commande: npm run serve

Une fois le backend, le frontend et la base de données connecter, l'application est disponible à l'adresse suivante: http://localhost:8080/