const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    try {
        const tokenT = req.headers.authorization.split(' ')[1].toString();
        console.log('tokenT', tokenT);

        const decodedToken = jwt.verify(tokenT, process.env.CLE_TOKEN);
        console.log('tok', decodedToken);

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
    } catch (error) {
        console.log('err', error)
        res.status(401).json({
            error: new Error('Requête invalide')
        });
    }
}