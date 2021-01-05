const express = require('express');
const contactController = require('../app/controllers/ContactController');
const router = express.Router();



//newController.index;
router.use('/',contactController.index)

module.exports =router;