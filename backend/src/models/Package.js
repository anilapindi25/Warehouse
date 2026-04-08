const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
  trackingNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  senderName: {
    type: String,
    required: true,
  },
  senderEmail: {
    type: String,
    required: true,
  },
  recipientName: {
    type: String,
    required: true,
  },
  recipientEmail: {
    type: String,
    required: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  weight: {
    value: Number,
    unit: {
      type: String,
      enum: ['kg', 'lbs'],
      default: 'kg',
    },
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    unit: {
      type: String,
      enum: ['cm', 'inches'],
      default: 'cm',
    },
  },
  size: {
    type: String,
    enum: ['SMALL', 'MEDIUM', 'LARGE'],
    required: true,
  },
  content: String,
  status: {
    type: String,
    enum: ['pending', 'in-transit', 'delivered', 'returned', 'lost'],
    default: 'pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  deliveredAt: Date,
}, {
  timestamps: true,
});

// Update the updatedAt field before saving
packageSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Package', packageSchema);
