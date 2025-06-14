const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const auth = require('../middleware/authMiddleware');
const khetController = require('../controllers/khetController');

router.post('/create', auth, upload.single('photo'), khetController.createKhet);
router.post('/:khetId/crop-log', auth, upload.single('photo'), khetController.addCropLog);
router.post('/:khetId/soil-log', auth, upload.single('photo'), khetController.addSoilLog);
router.post('/:khetId/irrigation-log', auth, upload.single('photo'), khetController.addIrrigationLog);
router.post('/:khetId/pest-log', auth, upload.single('photo'), khetController.addPestLog);
router.post('/:khetId/economic-log', auth, khetController.addEconomicLog);
router.post('/:khetId/custom-log', auth, upload.single('photo'), khetController.addCustomLog);

module.exports = router;
