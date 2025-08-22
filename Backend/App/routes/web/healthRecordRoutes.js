


const express = require('express');
const router = express.Router();
const healthRecordController = require('../../controllers/healthRecordController');

router.post('/store-data', healthRecordController.storeData);
router.post('/transact', healthRecordController.transact);
// router.post('/fetch-data', healthRecordController.fetchData);
router.get('/fetch-data/:account', healthRecordController.fetchData);
router.get('/pinata-auth', healthRecordController.getPinataAuth); // New endpoint

module.exports = router;