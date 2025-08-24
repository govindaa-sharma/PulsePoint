const express = require('express');
const router = express.Router();
const { initiateCall, endCall, getCallHistory, getCallDetails } = require('../controllers/callController');
const { authenticateToken } = require('../middleware/auth');

// All routes are protected
router.use(authenticateToken);

router.post('/initiate', initiateCall);
router.post('/end/:callId', endCall);
router.get('/history/:userId', getCallHistory);
router.get('/details/:callId', getCallDetails);

module.exports = router;