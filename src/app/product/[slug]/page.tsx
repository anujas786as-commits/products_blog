import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Star, ShoppingCart, CheckCircle2, AlertCircle, ArrowLeft, ExternalLink, BookOpen, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getProductBySlug, getProductsByCategory } from '@/services/productService';
import { getBlogsByProduct } from '@/services/blogService';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  
  if (!product) return { title: 'Product Not Found' };
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const seoTitle = product.seo?.title || `${product.title} Review & Deals | BestPicks`;
  const seoDesc = product.seo?.description || product.description.substring(0, 160);
  
  return {
    title: seoTitle,
    description: seoDesc,
    keywords: product.seo?.keywords || product.tags || [],
    alternates: {
      canonical: `${baseUrl}/product/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `${baseUrl}/product/${slug}`,
      images: product.images?.[0] ? [{ url: product.images[0] }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: product.images?.[0] ? [product.images[0]] : [],
    }
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedBlogs = await getBlogsByProduct(product._id);

  // Fetch real related products in the same category
  const allRelated = await getProductsByCategory(product.category?._id || product.category);
  const relatedProducts = allRelated
    .filter((p: any) => p._id.toString() !== product._id.toString())
    .slice(0, 6);

  // Generate dynamic JSON-LD structured data for Google & Search Bots
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    image: product.images || [],
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'BestPicks',
    },
    sku: product._id.toString(),
    mpn: product._id.toString(),
    ...(product.price && {
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: product.price,
        highPrice: product.price,
        offerCount: product.externalLinks?.length || 0,
        offers: (product.externalLinks || []).map((link: any) => ({
          '@type': 'Offer',
          url: link.url,
          priceCurrency: 'INR',
          price: product.price,
          availability: 'https://schema.org/InStock',
          seller: {
            '@type': 'Organization',
            name: link.store,
          },
        })),
      },
    }),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating || 4.5,
      reviewCount: 24,
      bestRating: 5,
      worstRating: 1,
    },
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square rounded-2xl overflow-hidden border bg-muted">
            {product.images?.[0] ? (
              <Image
                src={product.images[0]}
                alt={product.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">No image available</div>
            )}
          </div>
          {/* Thumbnail grid could go here */}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full mb-4 uppercase tracking-wider">
              {product.category?.name}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{product.title}</h1>
            
            {product.rating && product.rating > 0 && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-5 w-5 fill-current" />
                  <span className="ml-1 font-bold">{product.rating}</span>
                </div>
                <span className="text-muted-foreground text-sm">| Verified Reviewer Favorite</span>
              </div>
            )}

            {product.price && (
              <div className="text-3xl font-bold text-primary mb-6">
                ₹{product.price.toLocaleString()}
              </div>
            )}

            <p className="text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>
          </div>

          <div className="space-y-6 mt-auto">
            <h3 className="font-bold text-lg">Buy from Trusted Stores:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {product.externalLinks.map((link: any, index: number) => (
                <a 
                  key={index} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Button size="lg" className="w-full h-14 text-lg font-bold flex items-center justify-center gap-2">
                    <ShoppingCart className="h-5 w-5" />
                    Buy on {link.store}
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </a>
              ))}
            </div>
            <p className="text-[10px] text-muted-foreground italic">
              * We may earn a small commission when you purchase through our links at no extra cost to you.
            </p>
          </div>
        </div>
      </div>

      {/* Why Buy This Section (Mocked for now as per plan Requirements) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20 bg-muted/30 p-8 rounded-2xl">
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-green-500" />
            Pros
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <span>Premium build quality and durable materials.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <span>Excellent value for money compared to competitors.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
              <span>Highly rated by experts and users alike.</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <AlertCircle className="text-amber-500" />
            Things to Consider
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <span>May be slightly larger than some alternatives.</span>
            </li>
            <li className="flex items-start gap-3">
              <div className="h-1.5 w-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
              <span>Requires initial setup for smart features.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Related Blogs Section */}
      {relatedBlogs.length > 0 && (
        <section className="mb-20">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            Featured in Buying Guides
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedBlogs.map((blog: any) => (
              <Link 
                key={blog._id} 
                href={`/blog/${blog.slug}`}
                className="group p-6 bg-card border rounded-2xl hover:border-primary transition-all shadow-sm flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold group-hover:text-primary transition-colors">{blog.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{blog.excerpt}</p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold mb-8">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {relatedProducts.map((p: any) => (
              <ProductCard key={p._id.toString()} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
