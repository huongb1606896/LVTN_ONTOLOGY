const express = require('express');
const trieuchungController = require('../app/controllers/TrieuChungController');
const router = express.Router();



//newController.index;
router.get('/',trieuchungController.index)

module.exports =router;