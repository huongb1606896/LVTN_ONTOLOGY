const express = require('express');
const benhController = require('../app/controllers/BenhController');
const router = express.Router();

 

//newController.index;
router.get('/',benhController.index)

module.exports =router;