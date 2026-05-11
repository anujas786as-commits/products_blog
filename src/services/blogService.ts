import dbConnect from '@/lib/mongodb';
import Blog, { IBlog } from '@/models/Blog';

export async function getAllBlogs() {
  await dbConnect();
  return Blog.find({}).sort({ createdAt: -1 });
}

export async function getBlogBySlug(slug: string): Promise<IBlog | null> {
  await dbConnect();
  return Blog.findOne({ slug }).populate('relatedProducts');
}

export async function getLatestBlogs(limit: number = 5) {
  await dbConnect();
  return Blog.find({}).sort({ createdAt: -1 }).limit(limit);
}

export async function getBlogsByProduct(productId: any) {
  await dbConnect();
  return Blog.find({ relatedProducts: productId }).sort({ createdAt: -1 });
}
