const express = require('express');
const fdimgController = require('../app/controllers/FdimgController');
const router = express.Router();



//newController.index;
router.use('/',fdimgController.index)

module.exports =router; 