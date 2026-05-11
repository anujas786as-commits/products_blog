'use server';

import { revalidatePath } from 'next/cache';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Blog from '@/models/Blog';
import { redirect } from 'next/navigation';

// CATEGORY ACTIONS
export async function createCategory(formData: FormData) {
  await dbConnect();
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;

  await Category.create({ name, slug, description });
  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function updateCategory(id: string, formData: FormData) {
  await dbConnect();
  const name = formData.get('name') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;

  await Category.findByIdAndUpdate(id, { name, slug, description });
  revalidatePath('/admin/categories');
  redirect('/admin/categories');
}

export async function deleteCategory(id: string) {
  await dbConnect();
  await Category.findByIdAndDelete(id);
  revalidatePath('/admin/categories');
}

// PRODUCT ACTIONS
export async function createProduct(formData: FormData) {
  await dbConnect();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const rating = Number(formData.get('rating'));
  const category = formData.get('category') as string;
  const featured = formData.get('featured') === 'on';
  const trending = formData.get('trending') === 'on';
  const images = (formData.get('images') as string).split(',').map(i => i.trim());
  
  const externalLinksJson = formData.get('externalLinks') as string;
  const externalLinks = JSON.parse(externalLinksJson);

  const seoTitle = formData.get('seoTitle') as string;
  const seoDescription = formData.get('seoDescription') as string;

  await Product.create({
    title, slug, description, price, rating, category, featured, trending, images, externalLinks,
    seo: { title: seoTitle, description: seoDescription }
  });
  
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function updateProduct(id: string, formData: FormData) {
  await dbConnect();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const description = formData.get('description') as string;
  const price = Number(formData.get('price'));
  const rating = Number(formData.get('rating'));
  const category = formData.get('category') as string;
  const featured = formData.get('featured') === 'on';
  const trending = formData.get('trending') === 'on';
  const images = (formData.get('images') as string).split(',').map(i => i.trim());
  
  const externalLinksJson = formData.get('externalLinks') as string;
  const externalLinks = JSON.parse(externalLinksJson);

  const seoTitle = formData.get('seoTitle') as string;
  const seoDescription = formData.get('seoDescription') as string;

  await Product.findByIdAndUpdate(id, {
    title, slug, description, price, rating, category, featured, trending, images, externalLinks,
    seo: { title: seoTitle, description: seoDescription }
  });
  
  revalidatePath('/admin/products');
  redirect('/admin/products');
}

export async function deleteProduct(id: string) {
  await dbConnect();
  await Product.findByIdAndDelete(id);
  revalidatePath('/admin/products');
}

// BLOG ACTIONS
export async function createBlog(formData: FormData) {
  await dbConnect();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const relatedProducts = (formData.get('relatedProducts') as string).split(',').filter(id => id).map(id => id.trim());
  
  const seoTitle = formData.get('seoTitle') as string;
  const seoDescription = formData.get('seoDescription') as string;

  await Blog.create({
    title, slug, excerpt, content, featuredImage, relatedProducts,
    seo: { title: seoTitle, description: seoDescription }
  });
  
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function updateBlog(id: string, formData: FormData) {
  await dbConnect();
  const title = formData.get('title') as string;
  const slug = formData.get('slug') as string;
  const excerpt = formData.get('excerpt') as string;
  const content = formData.get('content') as string;
  const featuredImage = formData.get('featuredImage') as string;
  const relatedProducts = (formData.get('relatedProducts') as string).split(',').filter(id => id).map(id => id.trim());
  
  const seoTitle = formData.get('seoTitle') as string;
  const seoDescription = formData.get('seoDescription') as string;

  await Blog.findByIdAndUpdate(id, {
    title, slug, excerpt, content, featuredImage, relatedProducts,
    seo: { title: seoTitle, description: seoDescription }
  });
  
  revalidatePath('/admin/blogs');
  redirect('/admin/blogs');
}

export async function deleteBlog(id: string) {
  await dbConnect();
  await Blog.findByIdAndDelete(id);
  revalidatePath('/admin/blogs');
}
