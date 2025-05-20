// backend/controllers/medicineController.js
const Medicine = require('../models/Medicine');
const User = require('../models/User');

// Search medicines by name (patient only)
exports.searchMedicine = async (req, res) => {
  const { name } = req.query;
  try {
    const meds = await Medicine.find({ name: { $regex: name, $options: 'i' } })
      .populate('vendor', 'name email'); // include vendor info
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Search error' });
  }
};
