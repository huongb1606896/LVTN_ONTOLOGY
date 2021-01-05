const express = require('express');
const diagnosaController = require('../app/controllers/DiagnosaController');
const router = express.Router();



//newController.index;
router.post('/',diagnosaController.index)

module.exports =router;