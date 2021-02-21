const cryptoJS = require('crypto-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

exports.signup = (req, res) => {
    // Cryptage de l'email avec cryptoJS HmacSHA512
    const hashEmail = cryptoJS.HmacSHA512(req.body.dataSignup.email, 'RANDOM_SECRET_EMAIL').toString();
    // Cryptage du mot de passe avec bcrypt
    bcrypt.hash(req.body.dataSignup.password, 10)
        .then(hashPassword => {
            // On compte le nombre du même email dans la table user
            db.query('SELECT COUNT(email) as number FROM user WHERE email = :email', { replacements: { email: hashEmail }, type: db.QueryTypes.SELECT })
                .then(Email => {
                    if (Email[0].number !== 0) {
                        res.status(401).json({ error });
                    }
                    // On insère les données dans la table user
                    db.query('INSERT INTO user(name, email, password) VALUES (:name, :email, :password)', {
                        replacements: {
                            name: req.body.dataSignup.name,
                            email: hashEmail,
                            password: hashPassword
                        },
                        type: db.QueryTypes.INSERT
                    })
                        .then(response => res.status(201).json({ response }))
                        .catch(() => res.status(401).json({ error: 'Votre inscription n\'a pas pu être effectuée' }))
                })
                .catch(() => res.status(400).json({ error: 'Votre inscription n\'a pas pu être effectuée' }))
        })
        .catch(() => res.status(500).json({ error: 'Votre inscription n\'a pas pu être effectuée' }));
}

exports.login = (req, res) => {
    // Cryptage de l'email avec cryptoJS HmacSHA512
    const hashEmail = cryptoJS.HmacSHA512(req.body.dataLogin.email, 'RANDOM_SECRET_EMAIL').toString();
    // On vérifie si cet email existe dans la table user
    db.query('SELECT * FROM user WHERE email = :email', { replacements: { email: hashEmail }, type: db.QueryTypes.SELECT })
        .then(dataUser => {
            if (!dataUser) {
                res.status(400).json({ error });
            }
            // On compare le mot de passe envoyer avec celui enregistré
            bcrypt.compare(req.body.dataLogin.password, dataUser[0].password)
                .then(valid => {
                    if (!valid) {
                        return res.status(400).json({ error });
                    }
                    res.status(200).json({
                        userId: dataUser[0].id,
                        token: jwt.sign(
                            { userId: dataUser[0].id },
                            'RANDOM_TOKEN_SECRET_GROUPOMANIA_P7_OPEN_CLASSROOMS'
                        ),
                        name: dataUser[0].name,
                        email: req.body.dataLogin.email
                    })
                })
                .catch(() => res.status(500).json({ error: 'Connexion impossible' }));
        })
        .catch(() => res.status(500).json({ error: 'Connexion impossible' }));
}

exports.deleteProfil = (req, res) => {
    // On supprime l'utilisateur à partir de son id
    db.query('DELETE FROM user WHERE id = :id', { replacements: { id: req.body.userId }, type: db.QueryTypes.DELETE })
        .then(response => res.status(200).json({ response }))
        .catch(error => res.status(402).json({ error: req.body.userId }))
}