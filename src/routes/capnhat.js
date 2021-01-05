const express = require('express');
const capnhatController = require('../app/controllers/CapnhatController');
const router = express.Router();



//newController.index;
router.get('/trieuchung',capnhatController.index)
// router.get('/vitri',capnhatController.getVitri)

module.exports =router;