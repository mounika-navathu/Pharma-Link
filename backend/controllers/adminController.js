// backend/controllers/adminController.js
const User = require('../models/User');

// Get list of vendors (for approval, admin only)
exports.getVendors = async (req, res) => {
  try {
    const vendors = await User.find({ role: 'vendor' });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching vendors' });
  }
};

// Approve a vendor (admin only)
exports.approveVendor = async (req, res) => {
  const { vendorId } = req.params;
  try {
    const vendor = await User.findById(vendorId);
    if (!vendor || vendor.role !== 'vendor') {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    vendor.isApproved = true;
    await vendor.save();
    res.json({ message: 'Vendor approved' });
  } catch (err) {
    res.status(500).json({ message: 'Error approving vendor' });
  }
};

// Get platform statistics (admin only)
exports.getStats = async (req, res) => {
  try {
    const totalVendors = await User.countDocuments({ role: 'vendor' });
    const approvedVendors = await User.countDocuments({ role: 'vendor', isApproved: true });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    res.json({ totalVendors, approvedVendors, totalPatients });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};
