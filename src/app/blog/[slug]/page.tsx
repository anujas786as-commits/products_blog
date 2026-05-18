import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getBlogBySlug } from '@/services/blogService';
import ProductCard from '@/components/product/ProductCard';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);
  
  if (!blog) return { title: 'Blog Not Found' };
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const seoTitle = blog.seo?.title || `${blog.title} | BestPicks`;
  const seoDesc = blog.seo?.description || blog.excerpt;
  
  return {
    title: seoTitle,
    description: seoDesc,
    keywords: blog.seo?.keywords || [],
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      url: `${baseUrl}/blog/${slug}`,
      images: blog.featuredImage ? [{ url: blog.featuredImage }] : [],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDesc,
      images: blog.featuredImage ? [blog.featuredImage] : [],
    }
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.featuredImage ? [blog.featuredImage] : [],
    datePublished: new Date(blog.createdAt).toISOString(),
    dateModified: new Date(blog.updatedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: 'BestPicks Expert',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BestPicks',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/Gemini_Generated_Image_gd4h35gd4h35gd4h-removebg-preview.png`,
      },
    },
    description: blog.excerpt || blog.seo?.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/blog/${blog.slug}`,
    },
  };

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Inject Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link href="/blogs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-12 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog List
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {new Date(blog.createdAt).toLocaleDateString()}
          </span>
          <span>•</span>
          <span>Expert Buying Guide</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">{blog.title}</h1>
        {blog.excerpt && (
          <p className="text-xl text-muted-foreground italic border-l-4 border-primary pl-6 py-2 mb-8">
            {blog.excerpt}
          </p>
        )}
      </header>

      {blog.featuredImage && (
        <div className="relative aspect-video rounded-3xl overflow-hidden mb-16 shadow-2xl border">
          <Image
            src={blog.featuredImage}
            alt={blog.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content Area */}
      <div 
        className="prose prose-lg dark:prose-invert max-w-none mb-20 leading-relaxed text-lg text-foreground/90 
                   prose-headings:font-black prose-headings:text-foreground 
                   prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                   prose-img:rounded-3xl prose-img:shadow-lg prose-img:border"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Related Products Section */}
      {blog.relatedProducts && blog.relatedProducts.length > 0 && (
        <section className="bg-muted/30 p-10 rounded-3xl border">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
            Products Mentioned in this Article
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blog.relatedProducts.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Share Section */}
      <div className="mt-20 pt-10 border-t flex flex-col items-center gap-6">
        <h3 className="font-bold text-muted-foreground uppercase tracking-widest text-xs text-center">Share this guide</h3>
        <div className="flex gap-4">
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12"><Share2 className="h-5 w-5" /></Button>
          <Button variant="outline" size="icon" className="rounded-full h-12 w-12 text-[#1DA1F2]"><Tag className="h-5 w-5" /></Button>
        </div>
      </div>
    </article>
  );
}
