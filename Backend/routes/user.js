//IMPORT EXPRESS
const express = require('express');
//IMPORT ROUTEUR EXPRESS
const router = express.Router();

//IMPORT CONTROLLER USER
const userCtrl = require('../controllers/user');

//INITIATION DES ROUTES
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

//EXPORT MODULE ROUTEUR
module.exports = router;