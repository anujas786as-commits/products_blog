import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { createBlog } from '../../actions';
import ProductSelector from '@/components/admin/ProductSelector';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default async function NewBlogPage() {
  await dbConnect();
  const products = await Product.find({}).sort({ title: 1 });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/blogs" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Link>

      <header>
        <h1 className="text-3xl font-black">Write New Guide</h1>
        <p className="text-muted-foreground">Share your expertise and link products</p>
      </header>

      <form action={createBlog} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Blog Title</label>
                <input name="title" className="w-full h-12 px-4 rounded-xl border bg-background" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Slug</label>
                <input name="slug" className="w-full h-12 px-4 rounded-xl border bg-background" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Excerpt</label>
                <textarea name="excerpt" rows={2} className="w-full p-4 rounded-xl border bg-background" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Content</label>
                <RichTextEditor name="content" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">SEO & Media</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Featured Image URL</label>
                <input name="featuredImage" className="w-full h-12 px-4 rounded-xl border bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SEO Title</label>
                <input name="seoTitle" className="w-full h-12 px-4 rounded-xl border bg-background" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SEO Description</label>
                <textarea name="seoDescription" rows={3} className="w-full p-4 rounded-xl border bg-background text-sm" />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Linked Products</h2>
            <ProductSelector products={JSON.parse(JSON.stringify(products))} />
          </div>

          <Button type="submit" className="w-full h-16 text-xl font-black rounded-3xl shadow-xl hover:bg-primary/90 transition-all">
            Publish Guide
          </Button>
        </div>
      </form>
    </div>
  );
}
