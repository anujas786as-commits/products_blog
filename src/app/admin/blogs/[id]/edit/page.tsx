import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import Product from '@/models/Product';
import { updateBlog } from '../../../actions';
import ProductSelector from '@/components/admin/ProductSelector';
import RichTextEditor from '@/components/admin/RichTextEditor';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditBlogPage({ params }: Props) {
  const { id } = await params;

  await dbConnect();
  const [blogDoc, productDocs] = await Promise.all([
    Blog.findById(id).lean(),
    Product.find({}).sort({ title: 1 }).lean(),
  ]);

  if (!blogDoc) notFound();

  const blog = blogDoc as {
    _id: { toString(): string };
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featuredImage?: string;
    relatedProducts: { toString(): string }[];
    seo?: { title?: string; description?: string };
  };

  const products = (productDocs as { _id: { toString(): string }; title: string }[]).map((p) => ({
    _id: p._id.toString(),
    title: p.title,
  }));

  const selectedProductIds = blog.relatedProducts.map((id) => id.toString());

  const updateBlogWithId = updateBlog.bind(null, blog._id.toString());

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link
        href="/admin/blogs"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blogs
      </Link>

      <header>
        <h1 className="text-3xl font-black">Edit Blog Post</h1>
        <p className="text-muted-foreground">Update your guide content and settings</p>
      </header>

      <form action={updateBlogWithId} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Blog Title
                </label>
                <input
                  name="title"
                  defaultValue={blog.title}
                  className="w-full h-12 px-4 rounded-xl border bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Slug
                </label>
                <input
                  name="slug"
                  defaultValue={blog.slug}
                  className="w-full h-12 px-4 rounded-xl border bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Excerpt
                </label>
                <textarea
                  name="excerpt"
                  defaultValue={blog.excerpt}
                  rows={2}
                  className="w-full p-4 rounded-xl border bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Content
                </label>
                <RichTextEditor name="content" defaultValue={blog.content} />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">SEO &amp; Media</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Featured Image URL
                </label>
                <input
                  name="featuredImage"
                  defaultValue={blog.featuredImage || ''}
                  className="w-full h-12 px-4 rounded-xl border bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  SEO Title
                </label>
                <input
                  name="seoTitle"
                  defaultValue={blog.seo?.title || ''}
                  className="w-full h-12 px-4 rounded-xl border bg-background"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  SEO Description
                </label>
                <textarea
                  name="seoDescription"
                  defaultValue={blog.seo?.description || ''}
                  rows={3}
                  className="w-full p-4 rounded-xl border bg-background text-sm"
                />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Linked Products</h2>
            <ProductSelector products={products} defaultSelectedIds={selectedProductIds} />
          </div>

          <Button
            type="submit"
            className="w-full h-16 text-xl font-black rounded-3xl shadow-xl hover:bg-primary/90 transition-all"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
