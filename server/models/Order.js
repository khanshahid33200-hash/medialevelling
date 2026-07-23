import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'submitted', 'verified', 'approved', 'rejected'],
    default: 'pending'
  },
  upiTxnId: {
    type: String,
    trim: true,
    sparse: true, // Allows null/missing values while ensuring uniqueness for non-null values
    unique: true,
    index: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '1d' } // Mongoose index to auto-delete documents (TTL) after a day if needed, or we just handle expiration dynamically.
  }
}, {
  timestamps: true
});

// A virtual helper to check if order has expired
OrderSchema.virtual('isExpired').get(function() {
  return new Date() > this.expiresAt && (this.paymentStatus === 'pending');
});

const Order = mongoose.model('Order', OrderSchema);

export default Order;
