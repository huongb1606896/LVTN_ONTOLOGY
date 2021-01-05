const express = require('express');
const infimgController = require('../app/controllers/InfimgController');
const router = express.Router();



//newController.index;
router.get('/:public_id',infimgController.index)

module.exports =router;