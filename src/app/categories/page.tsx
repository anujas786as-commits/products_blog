export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import CategoryIcon from '@/components/ui/CategoryIcon';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';

export const metadata = {
  title: 'Product Categories | BestPicks',
  description: 'Browse our curated product categories to find the best expert-reviewed products.',
};

export default async function CategoriesPage() {
  await dbConnect();
  
  // Fetch categories and count products in each
  const categories = await Category.find({}).sort({ name: 1 });
  
  // Get product counts for each category
  const categoriesWithCounts = await Promise.all(
    categories.map(async (cat) => {
      const count = await Product.countDocuments({ category: cat._id });
      return {
        ...cat.toObject(),
        productCount: count,
      };
    })
  );

  return (
    <div className="bg-muted/30 min-h-screen py-16">
      <div className="container mx-auto px-4">
        <header className="max-w-2xl mb-12">
          <h1 className="text-4xl font-black mb-4">Explore Categories</h1>
          <p className="text-muted-foreground text-lg">
            Find the perfect products by browsing our expert-curated collections.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categoriesWithCounts.map((cat) => (
            <Link 
              key={cat._id.toString()} 
              href={`/category/${cat.slug}`}
              className="group bg-card border rounded-3xl p-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Decorative background element */}
              <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity text-primary">
                <CategoryIcon name={cat.name} size={120} />
              </div>

              <div className="relative z-10">
                <div className="h-14 w-14 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 relative overflow-hidden">
                  {cat.image ? (
                    <Image src={cat.image} alt={cat.name} fill className="object-cover" />
                  ) : (
                    <CategoryIcon name={cat.name} size={28} />
                  )}
                </div>
                
                <h2 className="text-2xl font-bold mb-3">{cat.name}</h2>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-6">
                  {cat.description || `Expert-reviewed top picks for ${cat.name}.`}
                </p>
                
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-muted">
                  <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
                    {cat.productCount} {cat.productCount === 1 ? 'Product' : 'Products'}
                  </span>
                  <div className="flex items-center gap-1 text-primary font-bold text-sm">
                    View All <ChevronRight size={16} />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {categoriesWithCounts.length === 0 && (
          <div className="text-center py-20 bg-card border rounded-3xl">
            <h3 className="text-xl font-bold mb-2">No Categories Found</h3>
            <p className="text-muted-foreground">Check back soon for curated collections.</p>
          </div>
        )}
      </div>
    </div>
  );
}
