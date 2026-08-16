const express = require('express');
const router = express.Router();
const { submitContactMessage } = require('../controllers/contact.controller');

router.post('/', submitContactMessage);

module.exports = router;