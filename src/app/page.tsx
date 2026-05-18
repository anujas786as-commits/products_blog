export const dynamic = 'force-dynamic';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, Zap, Award, BookOpen } from 'lucide-react';
import CategoryIcon from '@/components/ui/CategoryIcon';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ProductCard from '@/components/product/ProductCard';
import { getFeaturedProducts, getTrendingProducts } from '@/services/productService';
import { getAllCategories } from '@/services/categoryService';
import { getLatestBlogs } from '@/services/blogService';

export default async function HomePage() {
  // Fetch data
  const featuredProducts = await getFeaturedProducts();
  const trendingProducts = await getTrendingProducts();
  const categories = await getAllCategories();
  const latestBlogs = await getLatestBlogs(3);

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <section className="relative bg-muted/30 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
              Find the Best Products, <br />
              <span className="text-primary">Expertly Curated.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              We research and compare products from top marketplaces so you don't have to. 
              Get the best deals on Amazon, Flipkart, and Meesho.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="#featured" className={cn(buttonVariants({ size: 'lg' }))}>
                  Browse Featured <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/blogs" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>
                  Read Buying Guides
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative background element */}
        <div className="absolute top-1/2 -right-24 -translate-y-1/2 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      </section>

      {/* Categories Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-primary" />
            Shop by Category
          </h2>
          <Link href="/categories" className={cn(buttonVariants({ variant: 'ghost' }))}>View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.length > 0 ? (
            categories.map((category: any) => (
              <Link
                key={category._id}
                href={`/category/${category.slug}`}
                className="group p-6 bg-card border rounded-xl text-center hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors relative overflow-hidden">
                  {category.image ? (
                    <Image src={category.image} alt={category.name} fill className="object-cover" />
                  ) : (
                    <CategoryIcon name={category.name} className="w-6 h-6" />
                  )}
                </div>
                <h3 className="font-semibold text-sm">{category.name}</h3>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-8">No categories found.</p>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section id="featured" className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Award className="h-6 w-6 text-primary" />
            Featured Picks
          </h2>
          <Link href="/search?filter=featured" className={cn(buttonVariants({ variant: 'ghost' }))}>View All</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {featuredProducts.length > 0 ? (
            featuredProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-12 border rounded-xl bg-muted/20">
              Check back soon for our featured picks!
            </p>
          )}
        </div>
      </section>

      {/* Trending Section */}
      <section className="bg-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Zap className="h-6 w-6 text-primary" />
              Trending Now
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {trendingProducts.length > 0 ? (
              trendingProducts.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <p className="col-span-full text-center text-muted-foreground py-12 border rounded-xl bg-background">
                Stay tuned for trending products!
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Blogs Highlights */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Latest Guides & Articles
          </h2>
          <Link href="/blogs" className={cn(buttonVariants({ variant: 'ghost' }))}>Read All Blogs</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestBlogs.length > 0 ? (
            latestBlogs.map((blog: any) => (
              <Link
                key={blog._id}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative aspect-video bg-muted overflow-hidden">
                  {blog.featuredImage ? (
                    <Image
                      src={blog.featuredImage}
                      alt={blog.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-muted-foreground">No image</div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
                    {blog.excerpt}
                  </p>
                  <span className="text-primary text-sm font-bold flex items-center">
                    Read More <ArrowRight className="ml-1 h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground py-12">
              Our blog is coming soon!
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
