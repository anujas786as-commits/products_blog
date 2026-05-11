import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { createCategory } from '../../actions';

export default function NewCategoryPage() {
  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link href="/admin/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to List
      </Link>

      <header>
        <h1 className="text-3xl font-black">Add New Category</h1>
        <p className="text-muted-foreground">Create a new category for your products</p>
      </header>

      <div className="bg-card border rounded-3xl p-8">
        <form action={createCategory} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Category Name</label>
            <input 
              name="name" 
              placeholder="e.g. Smart Tech" 
              className="w-full h-12 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">URL Slug</label>
            <input 
              name="slug" 
              placeholder="e.g. smart-tech" 
              className="w-full h-12 px-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none"
              required 
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Description (SEO)</label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Enter category description for SEO..." 
              className="w-full p-4 rounded-xl border bg-background focus:ring-2 focus:ring-primary outline-none resize-none"
            />
          </div>

          <Button type="submit" className="w-full h-12 text-lg font-bold">Save Category</Button>
        </form>
      </div>
    </div>
  );
}
