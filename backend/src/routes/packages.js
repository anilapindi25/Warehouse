const express = require('express');
const router = express.Router();
const Package = require('../models/Package');
const { CAPACITY } = require('../constants/capacity');

// GET all packages
router.get('/', async (req, res, next) => {
  try {
    const { status, limit = 10, skip = 0 } = req.query;
    const query = status ? { status } : {};
    
    const packages = await Package.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });

    const total = await Package.countDocuments(query);

    res.status(200).json({
      success: true,
      count: packages.length,
      total,
      limit: parseInt(limit),
      skip: parseInt(skip),
      data: packages,
    });
  } catch (error) {
    next(error);
  }
});

// GET warehouse capacity status
router.get('/capacity', async (req, res, next) => {
  try {
    const capacityStatus = {};

    // Calculate capacity for each size
    for (const [size, capacity] of Object.entries(CAPACITY)) {
      const used = await Package.countDocuments({ size });
      const available = capacity - used;

      capacityStatus[size] = {
        used,
        available,
        total: capacity,
      };
    }

    res.status(200).json({
      success: true,
      data: capacityStatus,
    });
  } catch (error) {
    next(error);
  }
});

// GET single package by ID
router.get('/:id', async (req, res, next) => {
  try {
    const package = await Package.findById(req.params.id);
    
    if (!package) {
      return res.status(404).json({
        success: false,
        error: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      data: package,
    });
  } catch (error) {
    next(error);
  }
});

// GET package by tracking number
router.get('/track/:trackingNumber', async (req, res, next) => {
  try {
    const package = await Package.findOne({ trackingNumber: req.params.trackingNumber });
    
    if (!package) {
      return res.status(404).json({
        success: false,
        error: 'Package with tracking number not found',
      });
    }

    res.status(200).json({
      success: true,
      data: package,
    });
  } catch (error) {
    next(error);
  }
});

// POST add package with capacity check
router.post('/add', async (req, res, next) => {
  try {
    const { size, ...packageData } = req.body;

    // Validate size is provided
    if (!size) {
      return res.status(400).json({
        success: false,
        error: 'Size is required',
      });
    }

    // Validate size is one of the allowed values
    if (!CAPACITY[size]) {
      return res.status(400).json({
        success: false,
        error: `Invalid size. Allowed sizes: ${Object.keys(CAPACITY).join(', ')}`,
      });
    }

    // Count existing packages of this size
    const countOfSize = await Package.countDocuments({ size });
    const capacityForSize = CAPACITY[size];

    // Check if capacity is exceeded
    if (countOfSize >= capacityForSize) {
      return res.status(409).json({
        success: false,
        error: 'No space available',
        details: {
          size,
          current: countOfSize,
          capacity: capacityForSize,
        },
      });
    }

    // Create and save new package
    const newPackage = new Package({ size, ...packageData });
    const savedPackage = await newPackage.save();

    res.status(201).json({
      success: true,
      message: 'Package added successfully',
      data: savedPackage,
      remaining: capacityForSize - countOfSize - 1,
    });
  } catch (error) {
    next(error);
  }
});

// POST create new package
router.post('/', async (req, res, next) => {
  try {
    const newPackage = new Package(req.body);
    const savedPackage = await newPackage.save();

    res.status(201).json({
      success: true,
      message: 'Package created successfully',
      data: savedPackage,
    });
  } catch (error) {
    next(error);
  }
});

// PATCH update package
router.patch('/:id', async (req, res, next) => {
  try {
    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        error: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package updated successfully',
      data: updatedPackage,
    });
  } catch (error) {
    next(error);
  }
});

// PUT update package status
router.put('/:id/status', async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'in-transit', 'delivered', 'returned', 'lost'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status value',
      });
    }

    const updateData = { status };
    if (status === 'delivered') {
      updateData.deliveredAt = new Date();
    }

    const updatedPackage = await Package.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPackage) {
      return res.status(404).json({
        success: false,
        error: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package status updated successfully',
      data: updatedPackage,
    });
  } catch (error) {
    next(error);
  }
});

// DELETE package by ID (remove endpoint) - must be before generic /:id route
router.delete('/remove/:id', async (req, res, next) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        error: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package removed successfully',
    });
  } catch (error) {
    next(error);
  }
});

// DELETE package
router.delete('/:id', async (req, res, next) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);

    if (!deletedPackage) {
      return res.status(404).json({
        success: false,
        error: 'Package not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Package deleted successfully',
      data: deletedPackage,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
