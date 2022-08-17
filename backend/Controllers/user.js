const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cryptoMail = require('crypto-js');
require('dotenv').config();

const userModels = require('../Models/user');

exports.signup = (req, res, next) => {
    const pseudo = req.body.pseudo;
    const emailCrypto = cryptoMail.HmacSHA256(req.body.email, process.env.CLE_CRYPTO).toString();
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new userModels({
                pseudo: pseudo,
                profil: req.file ? `${req.protocol}://${req.get('host')}/profils/${req.file.filename}` : '',
                email: emailCrypto,
                password: hash
            });

            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé', userId: user._id }))
                .catch(error => res.status(401).json({ error: 'Email déjà utilisé' }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    const emailCrypto = cryptoMail.HmacSHA256(req.body.email, process.env.CLE_CRYPTO).toString();
    userModels.findOne({ email: emailCrypto })
        .then(user => {
            if (!user) {
                return res.status(400).json({ error: 'Utilisateur non trouvé' });
            }
            bcrypt.compare(req.body.password, user.password)
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ error: 'Mot de passe incorrect' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.CLE_TOKEN,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ message: error }));
        })
        .catch(error => res.status(500).json({ message2: error }));
}
