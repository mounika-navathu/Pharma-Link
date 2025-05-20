// backend/routes/medicineRoutes.js
const express = require('express');
const router = express.Router();
const {
  addMedicine,
  updateMedicine,
  deleteMedicine,
  getVendorMedicines
} = require('../controllers/vendorController');
const { verifyToken, isVendor } = require('../middleware/authMiddleware');

// Vendor must be authenticated and have vendor role
router.post('/vendor/medicines', verifyToken, isVendor, addMedicine);
router.get('/vendor/medicines', verifyToken, isVendor, getVendorMedicines);
router.put('/vendor/medicines/:medId', verifyToken, isVendor, updateMedicine);
router.delete('/vendor/medicines/:medId', verifyToken, isVendor, deleteMedicine);

module.exports = router;

// backend/routes/medicineRoutes.js (append)
const { searchMedicine } = require('../controllers/medicineController');
const { isPatient } = require('../middleware/authMiddleware');

// Patient medicine search
router.get('/patient/search', verifyToken, isPatient, searchMedicine);



