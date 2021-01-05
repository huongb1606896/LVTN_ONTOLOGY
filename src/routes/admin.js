const express = require('express');
const userController = require('../app/controllers/UserController');
const router = express.Router();




//newController.index;
router.use('/',userController.index)

module.exports =router;