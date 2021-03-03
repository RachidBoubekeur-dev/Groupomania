Groupomania

Pour faire fonctionner l'application en local, il faut installer via le terminal:

Dans le dossier backend: 

- npm init (Vous pouvez utiliser les options par défaut ou les modifier si vous le souhaitez. Cependant, votre point d'entrée doit être server.js)

- npm install -g nodemon

- npm install -g nodemon

- npm install --save express

- npm install --save express-rate-limit

- npm install --save body-parser

- npm install --save helmet

- npm install --save jsonwebtoken

- npm install --save crypto-js

- npm install --save bcrypt

- npm install --save sequelize

- npm install --save mysql2

- npm install --save sqlite3

Dans le dossier frontend:

- npm install -g @vue/cli

- vue create my-vue-app
- Merge
- Vue 3

Dans le dossier frontend/my-vue-app:

- npm install --save axios vue-axios

- npm install --save "@tinymce/tinymce-vue@^4"

Vous aurez besoin d'une base de données pour stocker vos données comme MySQL avec WAMP ou un autre logiciel selon votre système d'exploitation.

Vous pouvez modifier la configuration de connexion de l'application à votre base de données dans le fichier backend\config\database.js

Pour lancer l'application:

Pour activer le backend vous devez accéder au dossier: \backend 
Et entrer la commande: nodemon serve

Pour le frontend vous devez accéder au dossier: \frontend\my-vue-app
Et entrer la commande: npm run serve

Une fois le backend, le frontend et la base de données connecter, l'application est disponible à l'adresse suivante: http://localhost:8080/