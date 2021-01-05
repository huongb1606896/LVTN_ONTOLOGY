const express = require('express');
const tracuuthuocController = require('../app/controllers/TracuuthuocController');
const router = express.Router();



//newController.index;
router.get('/',tracuuthuocController.index)

module.exports =router;