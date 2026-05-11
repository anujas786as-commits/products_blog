import dbConnect from '@/lib/mongodb';
import Category, { ICategory } from '@/models/Category';

export async function getAllCategories(): Promise<ICategory[]> {
  await dbConnect();
  return Category.find({}).sort({ name: 1 });
}

export async function getCategoryBySlug(slug: string): Promise<ICategory | null> {
  await dbConnect();
  return Category.findOne({ slug });
}
