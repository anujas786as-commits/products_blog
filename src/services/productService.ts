import dbConnect from '@/lib/mongodb';
import Product, { IProduct } from '@/models/Product';

export async function getAllProducts(query: any = {}) {
  await dbConnect();
  return Product.find(query).populate('category').sort({ createdAt: -1 });
}

export async function getProductBySlug(slug: string): Promise<IProduct | null> {
  await dbConnect();
  return Product.findOne({ slug }).populate('category');
}

export async function getFeaturedProducts() {
  await dbConnect();
  return Product.find({ featured: true }).populate('category').limit(10);
}

export async function getTrendingProducts() {
  await dbConnect();
  return Product.find({ trending: true }).populate('category').limit(10);
}

export async function getProductsByCategory(categoryId: any) {
  await dbConnect();
  return Product.find({ category: categoryId }).populate('category');
}

export async function searchProducts(searchTerm: string) {
  await dbConnect();
  return Product.find(
    { $text: { $search: searchTerm } },
    { score: { $meta: 'textScore' } }
  )
    .sort({ score: { $meta: 'textScore' } })
    .populate('category');
}
