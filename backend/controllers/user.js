const cryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('./dbconnect');

exports.signup = (req, res, next) => {
    // Cryptage de l'email avec cryptoJS HmacSHA512
    const hashEmail = cryptoJS.HmacSHA512(req.body.email, 'RANDOM_SECRET_EMAIL');
    // Cryptage du mot de passe avec bcrypt
    bcrypt.hash(req.body.password, 10)
        .then(hashPassword => {
            const insertSignup = 'INSERT INTO user VALUES (?)';
            const dataUser = [req.body.name, hashEmail, hashPassword];
            return new Promise ((resolve, reject) => {
                db.query(insertSignup, dataUser, (err, results))
                    if (err) {
                        return reject(err);
                    }
                    return resolve(results);
            });
        })
        .catch(error => res.status(500).json({ error }));
};