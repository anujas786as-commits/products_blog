import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { createProduct } from '../../actions';

export default async function NewProductPage() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/admin/products" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Link>

      <header>
        <h1 className="text-3xl font-black">Add New Product</h1>
        <p className="text-muted-foreground">List a new product with affiliate links</p>
      </header>

      <form action={createProduct} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">General Info</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Title</label>
                <input name="title" className="w-full h-12 px-4 rounded-xl border bg-background" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Slug</label>
                <input name="slug" className="w-full h-12 px-4 rounded-xl border bg-background" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Price (₹)</label>
                    <input name="price" type="number" className="w-full h-12 px-4 rounded-xl border bg-background" required />
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Rating (1-5)</label>
                    <input name="rating" type="number" step="0.1" max="5" className="w-full h-12 px-4 rounded-xl border bg-background" required />
                 </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</label>
                <select name="category" className="w-full h-12 px-4 rounded-xl border bg-background" required>
                  {categories.map(cat => <option key={cat._id.toString()} value={cat._id.toString()}>{cat.name}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Images & Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Image URLs (comma separated)</label>
                <textarea name="images" rows={3} className="w-full p-4 rounded-xl border bg-background" required />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">External Links JSON</label>
                <textarea 
                  name="externalLinks" 
                  rows={4} 
                  className="w-full p-4 rounded-xl border bg-background font-mono text-xs" 
                  defaultValue={JSON.stringify([{ store: "Amazon", url: "", isAffiliate: true }], null, 2)}
                  required 
                />
                <p className="text-[10px] text-muted-foreground">Format: [{ "{ store: 'Amazon', url: '...', isAffiliate: true }" }]</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Details & Tags</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Description</label>
                <textarea name="description" rows={6} className="w-full p-4 rounded-xl border bg-background" required />
              </div>
              <div className="flex gap-8 pb-4 border-b">
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="featured" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm font-bold">Featured Product</span>
                 </label>
                 <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" name="trending" className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary" />
                    <span className="text-sm font-bold">Trending Now</span>
                 </label>
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">SEO Settings</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SEO Title</label>
                  <input name="seoTitle" className="w-full h-12 px-4 rounded-xl border bg-background" placeholder="Meta title for search engines" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">SEO Description</label>
                  <textarea name="seoDescription" rows={3} className="w-full p-4 rounded-xl border bg-background text-sm" placeholder="Meta description for search results" />
                </div>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full h-16 text-xl font-black rounded-3xl shadow-xl hover:scale-[1.02] transition-transform">
            Launch Product
          </Button>
        </div>
      </form>
    </div>
  );
}
