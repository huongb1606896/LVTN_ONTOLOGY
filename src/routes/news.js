const express = require('express');
const newsController = require('../app/controllers/NewsController');
const router = express.Router();



//newController.index;
router.use('/',newsController.index)

module.exports =router;