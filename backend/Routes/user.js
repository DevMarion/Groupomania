const express = require('express');

const validator = require('../Middleware/validator');

const userCtrl = require('../Controllers/user');
// const adminCtrl = require('../Controllers/admin');

const multer = require('../Middleware/multer-profil');

const router = express.Router();


// utilisateur

router.post('/signup', multer, validator, userCtrl.signup);
router.post('/login', userCtrl.login);

// admin

// router.get('/', adminCtrl.getAllUsers);
// router.get('/:id', adminCtrl.getOneUser);
// router.put('/:id', adminCtrl.modifyUser);
// router.delete('/:id', adminCtrl.deleteUser);

module.exports = router;