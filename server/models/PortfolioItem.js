import mongoose from 'mongoose';

const PortfolioItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  stats: {
    type: String,
    trim: true
  },
  details: {
    client: { type: String, trim: true, default: '' },
    objective: { type: String, trim: true, default: '' },
    approach: [{ type: String, trim: true }],
    results: [{ type: String, trim: true }]
  }
}, {
  timestamps: true
});

const PortfolioItem = mongoose.model('PortfolioItem', PortfolioItemSchema);

export default PortfolioItem;
