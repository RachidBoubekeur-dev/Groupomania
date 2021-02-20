const db = require('../config/database');

exports.shareArticle = (req, res) => {
    // On insère les données dans la table articleshare
    db.query('INSERT INTO articleshare(userId, title, link) VALUES (:userId, :title, :link)', {
        replacements: {
            userId: req.body.dataArticle.userId,
            title: req.body.dataArticle.title,
            link: req.body.dataArticle.link
        },
        type: db.QueryTypes.INSERT
    })
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }))
}