const express = require('express');
const router = express.Router();
const controller = require('../controllers/eventcontroller.js');
const multer = require('multer');
const upload = multer({ dest: 'public/images/' })
const {isLoggedIn, isAuthor, notAuthor} = require('../middlewares/auth');
const {validateId, validateRsvp, validateResult, validateEvent} = require('../middlewares/validator');

router.get('/', controller.index);

router.get('/new', controller.new);

router.post('/', isLoggedIn, upload.single('img'), validateEvent, validateResult, controller.create);

router.get('/:id', validateId, controller.show);

router.get('/:id/edit', isLoggedIn, validateId, isAuthor, controller.edit);

router.put('/:id', isLoggedIn, validateId, isAuthor, upload.single('img'), validateEvent, validateResult, controller.update);

router.delete('/:id', isLoggedIn, validateId, isAuthor, controller.delete);

router.post("/:id/rsvp", validateId, notAuthor, validateRsvp, validateResult, controller.rsvp)

module.exports = router;