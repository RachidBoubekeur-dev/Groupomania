const { response } = require('express');
const db = require('../config/database');

exports.shareArticle = (req, res) => {
    // On insère les données dans la table articleshare
    db.query('INSERT INTO articleshare(userId_share, title_share, link_share) VALUES (:userId, :title, :link)', {
        replacements: {
            userId: req.body.userId,
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
            userId: req.body.userId,
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
    db.query('SELECT id, userId, title FROM article ORDER BY id DESC', { type: db.QueryTypes.SELECT })
        .then(article => {
            // On sélectionne les données dans la table articleshare
            db.query('SELECT id_share, userId_share, title_share, link_share FROM articleshare ORDER BY id_share DESC', { type: db.QueryTypes.SELECT })
                .then(articleshare => res.status(200).json({ article, articleshare }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}

exports.getOneArticle = (req, res) => {
    // On vérifie si l'article existe
    db.query('SELECT COUNT(*) as number FROM article WHERE id = :id', { replacements: { id: parseInt(req.params.id) }, type: db.QueryTypes.SELECT })
        .then(() => {
            // On sélectionne les données de l'article dans la table article
            db.query('SELECT * FROM article WHERE id = :id', { replacements: { id: parseInt(req.params.id) }, type: db.QueryTypes.SELECT })
                .then(response => res.status(200).json({ response }))
                .catch(error => res.status(400).json({ error }))
        })
        .catch(error => res.status(400).json({ error }))
}

exports.updateArticle = (req, res) => {
    // On modifie les données de l'article dans la table article
    db.query('UPDATE article SET title = :title, content = :content WHERE id = :id', {
        replacements: {
            title: req.body.dataArticle.title,
            content: req.body.dataArticle.content,
            id: parseInt(req.params.id)
        },
        type: db.QueryTypes.UPDATE })
        .then(response => res.status(200).json({ response }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteArticle = (req, res) => {
    // On supprime les données de l'article dans la table article
    db.query('DELETE FROM article WHERE id = :id', { replacements: { id: parseInt(req.params.id) }, type: db.QueryTypes.DELETE })
        .then(response => res.status(200).json({ response }))
        .catch(error => res.status(400).json({ error }))
}

exports.deleteArticleShare = (req, res) => {
    // On supprime les données de l'article dans la table articleshare
    db.query('DELETE FROM articleshare WHERE id_share = :id', { replacements: { id: parseInt(req.params.id) }, type: db.QueryTypes.DELETE })
        .then(response => res.status(200).json({ response }))
        .catch(error => res.status(400).json({ error }))
}