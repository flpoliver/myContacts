const { Router } = require('express');
const CategoryController = require('./app/controllers/CategoryController');

const ContactController = require('./app/controllers/ContactController');

const router = Router();

router.post('/contacts', ContactController.store);
router.get('/contacts', ContactController.index);
router.get('/contacts/:id', ContactController.show);
router.put('/contacts/:id', ContactController.update);
router.delete('/contacts/:id', ContactController.delete);

router.post('/categories', CategoryController.store);
router.get('/categories', CategoryController.index);
router.get('/categories/:id', CategoryController.show);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.delete);

module.exports = router;
