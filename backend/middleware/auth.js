const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        // Récupération du token
        const token = req.headers.authorization.split(' ')[1];
        // Décodage du token
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_GROUPOMANIA_P7_OPEN_CLASSROOMS');
        const userIdToken = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userIdToken.toString()) {
            throw ' Invalid user ID'
        } else {
            next()
        }
    } catch {
        res.status(401).json({ error: new Error('Invalid request !') });
    }
};