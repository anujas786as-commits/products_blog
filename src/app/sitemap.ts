import { MetadataRoute } from 'next';
import { getAllProducts } from '@/services/productService';
import { getAllCategories } from '@/services/categoryService';
import { getAllBlogs } from '@/services/blogService';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Fetch all dynamic routes
  const products = await getAllProducts();
  const categories = await getAllCategories();
  const blogs = await getAllBlogs();

  const productUrls = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug}`,
    lastModified: product.updatedAt,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/category/${category.slug}`,
    lastModified: category.updatedAt,
  }));

  const blogUrls = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: blog.updatedAt,
  }));

  const staticUrls = [
    '',
    '/blogs',
    '/about',
    '/contact',
    '/privacy',
    '/disclaimer',
    '/affiliate-disclosure',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  return [...staticUrls, ...productUrls, ...categoryUrls, ...blogUrls];
}
