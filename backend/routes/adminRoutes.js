// backend/routes/authRoutes.js
const express = require('express');

const { register, login } = require('../controllers/authController');

// Register endpoints: patient or vendor
router.post('/register', register);
// Login
router.post('/login', login);

module.exports = router;


const express = require('express');
const router = express.Router();
const { getVendors, approveVendor, getStats } = require('../controllers/adminController');
const { verifyToken, isAdmin } = require('../middleware/authMiddleware');

router.get('/vendors', verifyToken, isAdmin, getVendors);
router.patch('/vendors/:vendorId/approve', verifyToken, isAdmin, approveVendor);
router.get('/stats', verifyToken, isAdmin, getStats);

module.exports = router;