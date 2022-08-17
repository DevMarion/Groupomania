const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const tokenT = req.headers.authorization.split(' ')[1].toString();

        const decodedToken = jwt.verify(tokenT, process.env.CLE_TOKEN);

        const userId = decodedToken.userId;
        console.log('userId', userId);
        console.log('req.body.userId', req.body.userId);
        if (req.body.userId && req.body.userId !== userId) {
            res.status(403).json({
                error: new Error('Requête non authorisée')
            });
        } else {
            console.log('next');
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Requête invalide')
        });
    }
}