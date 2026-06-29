import mongoose from 'mongoose';

const variantSchema = new mongoose.Schema({
  name: String,
  price: Number,
  stock: Number,
  sku: String
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name']
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price']
  },
  discountPrice: Number,
  stock: {
    type: Number,
    required: [true, 'Please add stock amount'],
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  images: [String],
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  variants: [variantSchema],
  materials: [String],
  tags: [String],
  isActive: {
    type: Boolean,
    default: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isActive: 1 });

export const Product = mongoose.model('Product', productSchema);
