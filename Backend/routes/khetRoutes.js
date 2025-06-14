const express = require('express');
const router = express.Router();
const upload = require('../middleware/multer');
const auth = require('../middleware/authMiddleware');
const khetController = require('../controllers/khetController');
const history = require('../controllers/khetController/historyController');



router.post('/create', auth, upload.single('photo'), khetController.createKhet);
router.post('/:khetId/crop-log', auth, upload.single('photo'), khetController.addCropLog);
router.post('/:khetId/soil-log', auth, upload.single('photo'), khetController.addSoilLog);
router.post('/:khetId/irrigation-log', auth, upload.single('photo'), khetController.addIrrigationLog);
router.post('/:khetId/pest-log', auth, upload.single('photo'), khetController.addPestLog);
router.post('/:khetId/economic-log', auth, khetController.addEconomicLog);
router.post('/:khetId/custom-log', auth, upload.single('photo'), khetController.addCustomLog);



// Get all khets of a user
router.get('/', auth, history.getUserKhets);
router.get('/:khetId', authMiddleware, khetController.getKhetById); 
// Logs (with pagination)
router.get('/:khetId/crop-logs', auth, history.getCropLogs);
router.get('/:khetId/soil-logs', auth, history.getSoilLogs);
router.get('/:khetId/irrigation-logs', auth, history.getIrrigationLogs);
router.get('/:khetId/pest-logs', auth, history.getPestLogs);
router.get('/:khetId/economic-logs', auth, history.getEconomicLogs);
router.get('/:khetId/custom-logs', auth, history.getCustomLogs);





module.exports = router;
