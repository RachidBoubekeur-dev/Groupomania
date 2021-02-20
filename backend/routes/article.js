const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const articleCtrl = require('../controllers/article');

router.post('/share', auth, articleCtrl.shareArticle);

module.exports = router;