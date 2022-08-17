const validator = require('password-validator');

const validatorShema = new validator();

validatorShema
    .is().min(8)                                        // Minimum length 8
    .is().max(10)                                       // Maximum length 100
    .has().uppercase(1)                                 // Must have uppercase letters                 
    .has().lowercase(1)                                 // Must have lowercase letters                    
    .has().digits(1)                                    // Must have at least 2 digits
    .has().not().spaces()                               // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']);     // Blacklist these values

module.exports = (req, res, next) => {
    if (validatorShema.validate(req.body.password)) {
        next();
    }
    else {
        res.status(400).json({ message: 'Le MDP doit faire entre 8 et 10 caractères, avec une Majuscule, une minuscule et au moins 1 chiffre' });
    }
};