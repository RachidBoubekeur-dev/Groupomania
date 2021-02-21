const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const articleCtrl = require('../controllers/article');

router.post('/new', auth, articleCtrl.newArticle);
router.post('/share', auth, articleCtrl.shareArticle);
router.get('/:id', articleCtrl.getOneArticle);
router.get('/', articleCtrl.getArticle);
router.put('/:id', articleCtrl.updateArticle);
router.delete('/:id', auth, articleCtrl.deleteArticle);

module.exports = router;