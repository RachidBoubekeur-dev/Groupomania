const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/profil', auth, userCtrl.profil);
router.delete('/profil', auth, userCtrl.deleteProfil);

module.exports = router;