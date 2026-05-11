import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, ArrowRight, Calendar } from 'lucide-react';
import { getAllBlogs } from '@/services/blogService';

export const metadata = {
  title: 'Buying Guides & Expert Reviews | BestPicks Blog',
  description: 'In-depth research and expert guides to help you make better purchasing decisions.',
};

export default async function BlogsPage() {
  const blogs = await getAllBlogs();

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="max-w-2xl mb-16">
        <h1 className="text-4xl font-extrabold mb-6 flex items-center gap-3">
          <BookOpen className="h-10 w-10 text-primary" />
          Our Blog
        </h1>
        <p className="text-xl text-muted-foreground">
          Expert guides, comparison articles, and the latest product reviews to help you shop smarter.
        </p>
      </header>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog: any) => (
            <Link
              key={blog._id}
              href={`/blog/${blog.slug}`}
              className="group flex flex-col bg-card border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1"
            >
              <div className="relative aspect-video bg-muted overflow-hidden">
                {blog.featuredImage ? (
                  <Image
                    src={blog.featuredImage}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-muted-foreground italic">No Preview Image</div>
                )}
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-4 font-medium uppercase tracking-widest">
                  <Calendar className="h-3 w-3" />
                  {new Date(blog.createdAt).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
                <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-2">
                  {blog.title}
                </h2>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 leading-relaxed">
                  {blog.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t flex items-center text-primary font-bold">
                  Read Full Article <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed">
          <p className="text-xl text-muted-foreground italic">We're writing our first guides! Stay tuned.</p>
        </div>
      )}
    </div>
  );
}
