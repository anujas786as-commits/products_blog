import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage?: string;
  relatedProducts: any[];
  seo: {
    title?: string;
    description?: string;
    keywords?: string[];
  };
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    excerpt: { type: String, required: true },
    featuredImage: { type: String },
    relatedProducts: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    seo: {
      title: { type: String },
      description: { type: String },
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
