import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  title: string;
  slug: string;
  description: string;
  images: string[];
  category: any; // Can be ObjectId or populated ICategory
  tags: string[];
  brand?: string;
  price?: number;
  rating?: number;
  externalLinks: {
    store: string;
    url: string;
    isAffiliate: boolean;
  }[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  featured: boolean;
  trending: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    images: [{ type: String }],
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: [{ type: String }],
    brand: { type: String },
    price: { type: Number },
    rating: { type: Number, default: 0 },
    externalLinks: [
      {
        store: { type: String, required: true },
        url: { type: String, required: true },
        isAffiliate: { type: Boolean, default: false },
      },
    ],
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
    featured: { type: Boolean, default: false },
    trending: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add indexes for search
ProductSchema.index({ title: 'text', description: 'text', tags: 'text' });

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);
