import mongoose, { Schema, Document } from 'mongoose';

export interface IClick extends Document {
  productId: mongoose.Types.ObjectId;
  source: string; // e.g., 'amazon', 'flipkart'
  clickedAt: Date;
}

const ClickSchema: Schema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  source: { type: String, required: true },
  clickedAt: { type: Date, default: Date.now },
});

export default mongoose.models.Click || mongoose.model<IClick>('Click', ClickSchema);
