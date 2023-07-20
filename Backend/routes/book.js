//IMPORT EXPRESS
const express = require('express');
//IMPORT ROUTEUR EXPRESS
const router = express.Router();

//IMPORT MIDDELEWARE AUTH
const auth = require('../middleware/auth');
//IMPORT MIDDELEWARE MULTER
const multer = require('../middleware/multer-config');

//IMPORT CONTROLLER BOOK
const bookCtrl = require('../controllers/book');

//INITIATION DES ROUTES
router.post('/', auth, multer, bookCtrl.addBook);
router.get('/', bookCtrl.getAllBooks);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, multer, bookCtrl.updateBook);
router.delete('/:id', auth, bookCtrl.deleteBook);

//EXPORT MODULE ROUTEUR 
module.exports = router;