import React from 'react';
import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/services/categoryService';
import { getProductsByCategory } from '@/services/productService';
import ProductCard from '@/components/product/ProductCard';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  
  if (!category) return { title: 'Category Not Found' };
  
  return {
    title: `Best ${category.name} Products`,
    description: category.description || `Browse the highest rated ${category.name} products from top marketplaces.`,
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category._id);

  return (
    <div className="container mx-auto px-4 py-12">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Home
      </Link>

      <header className="mb-12">
        <h1 className="text-4xl font-extrabold mb-4">{category.name}</h1>
        {category.description && (
          <p className="text-lg text-muted-foreground max-w-2xl">{category.description}</p>
        )}
      </header>

      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-2xl border-2 border-dashed">
          <p className="text-muted-foreground">We are currently curating the best products for this category. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
