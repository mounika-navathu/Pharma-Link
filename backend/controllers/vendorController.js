// backend/controllers/vendorController.js
const Medicine = require('../models/Medicine');
const User = require('../models/User');

// Add a new medicine (vendor only)
exports.addMedicine = async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    const vendorId = req.user.userId;
    const newMed = new Medicine({ name, price, stock, vendor: vendorId });
    await newMed.save();
    res.status(201).json(newMed);
  } catch (err) {
    res.status(500).json({ message: 'Error adding medicine' });
  }
};

// Update a medicine (vendor only, owns the medicine)
exports.updateMedicine = async (req, res) => {
  const { medId } = req.params;
  const { name, price, stock } = req.body;
  try {
    const med = await Medicine.findOne({ _id: medId, vendor: req.user.userId });
    if (!med) return res.status(404).json({ message: 'Medicine not found' });

    med.name = name; med.price = price; med.stock = stock;
    await med.save();
    res.json(med);
  } catch (err) {
    res.status(500).json({ message: 'Error updating medicine' });
  }
};

// Delete a medicine (vendor only, owns the medicine)
exports.deleteMedicine = async (req, res) => {
  const { medId } = req.params;
  try {
    const med = await Medicine.findOneAndDelete({ _id: medId, vendor: req.user.userId });
    if (!med) return res.status(404).json({ message: 'Medicine not found' });
    res.json({ message: 'Medicine deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting medicine' });
  }
};

// Get all medicines for the vendor (vendor only)
exports.getVendorMedicines = async (req, res) => {
  try {
    const meds = await Medicine.find({ vendor: req.user.userId });
    res.json(meds);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching medicines' });
  }
};
