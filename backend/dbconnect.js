const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'Groupomania'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database')
});

exports.db = db;