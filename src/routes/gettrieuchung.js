const express = require('express');
const gettrieuchungController = require('../app/controllers/GetTrieuchungController');
const router = express.Router();

 

//newController.index;
router.get('/trieuchungtrong',gettrieuchungController.trieuchungtrong)
router.get('/trieuchungngoai',gettrieuchungController.trieuchungngoai)
router.get('/ttngoai',gettrieuchungController.ttngoai)
router.get('/tttrong',gettrieuchungController.tttrong)
router.get('/trangthai',gettrieuchungController.trangthai)
router.get('/thongtinbenh',gettrieuchungController.thongtinbenh)

module.exports =router;