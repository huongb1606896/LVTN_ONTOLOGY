const express = require('express');
const infottController = require('../app/controllers/InfottController');
const router = express.Router();



//newController.index;
router.get('/:ten_benh',infottController.index)

module.exports =router;