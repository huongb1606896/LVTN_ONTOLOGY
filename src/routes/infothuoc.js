const express = require('express');
const infothuocController = require('../app/controllers/InfothuocController');
const router = express.Router();



//newController.index;
router.get('/:thuoc',infothuocController.index)
// router.get('/infimg/:thuoc',infothuocController.index)

module.exports =router;