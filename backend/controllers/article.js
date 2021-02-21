const { response } = require('express');
const db = require('../config/database');

exports.shareArticle = (req, res) => {
    // On insère les données dans la table articleshare
    db.query('INSERT INTO articleshare(userId_share, title_share, link_share) VALUES (:userId, :title, :link)', {
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

exports.newArticle = (req, res) => {
    let month;
    if(((new Date()).getMonth() + 1) < 10) {
        month = '0' + ((new Date()).getMonth() + 1)
    } else {
        month = ((new Date()).getMonth() + 1)
    }
    // On insère les données dans la table article
    db.query('INSERT INTO article(userId, title, content, date) VALUES (:userId, :title, :content, :date)', {
        replacements: {
            userId: req.body.dataArticle.userId,
            title: req.body.dataArticle.title,
            content: req.body.dataArticle.content,
            date: (new Date()).getDate() + '/' + month + '/' + (new Date()).getFullYear()
        },
        type: db.QueryTypes.INSERT
    })
        .then(response => res.status(201).json({ response }))
        .catch(error => res.status(400).json({ error }))
}

exports.getArticle = (req, res) => {
    // On sélectionne les données dans la table article
    db.query('SELECT id, title FROM article ORDER BY id DESC', { type: db.QueryTypes.SELECT })
        .then(article => {
            // On sélectionne les données dans la table articleshare
            db.query('SELECT title_share, link_share FROM articleshare ORDER BY id_share DESC', { type: db.QueryTypes.SELECT })
                .then(articleshare => res.status(200).json({ article, articleshare }))
                .catch(error => res.status(401).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}

exports.getOneArticle = (req, res) => {
    // On sélectionne les données de l'article dans la table article
    db.query('SELECT * FROM article WHERE id = :id', { replacements: { id: req.params.id }, type: db.QueryTypes.SELECT })
        .then(response => res.status(200).json({ response }))
        .catch(error => res.status(400).json({ error }))
}