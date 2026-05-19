import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { updateProduct } from '../../../actions';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  await dbConnect();
  const [productDoc, categoryDocs] = await Promise.all([
    Product.findById(id).lean(),
    Category.find({}).sort({ name: 1 }).lean(),
  ]);

  if (!productDoc) notFound();

  const product = productDoc as {
    _id: { toString(): string };
    title: string;
    slug: string;
    description: string;
    price?: number;
    rating?: number;
    category: { toString(): string };
    featured: boolean;
    trending: boolean;
    images: string[];
    externalLinks: { store: string; url: string; isAffiliate: boolean }[];
    seo?: { title?: string; description?: string };
  };

  const categories = (categoryDocs as { _id: { toString(): string }; name: string }[]).map((c) => ({
    _id: c._id.toString(),
    name: c.name,
  }));

  const updateProductWithId = updateProduct.bind(null, product._id.toString());

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link
        href="/admin/products"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Products
      </Link>

      <header>
        <h1 className="text-3xl font-black">Edit Product</h1>
        <p className="text-muted-foreground">Update product details and affiliate links</p>
      </header>

      <form action={updateProductWithId} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">General Info</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Product Title
                </label>
                <input
                  name="title"
                  defaultValue={product.title}
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
                  defaultValue={product.slug}
                  className="w-full h-12 px-4 rounded-xl border bg-background"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Price (₹)
                  </label>
                  <input
                    name="price"
                    type="number"
                    defaultValue={product.price ?? ''}
                    className="w-full h-12 px-4 rounded-xl border bg-background"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Rating (1-5)
                  </label>
                  <input
                    name="rating"
                    type="number"
                    step="0.1"
                    max="5"
                    defaultValue={product.rating ?? ''}
                    className="w-full h-12 px-4 rounded-xl border bg-background"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Category
                </label>
                <select
                  name="category"
                  defaultValue={product.category.toString()}
                  className="w-full h-12 px-4 rounded-xl border bg-background"
                  required
                >
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Images &amp; Links</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Image URLs (comma separated)
                </label>
                <textarea
                  name="images"
                  rows={3}
                  defaultValue={product.images.join(', ')}
                  className="w-full p-4 rounded-xl border bg-background"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  External Links JSON
                </label>
                <textarea
                  name="externalLinks"
                  rows={4}
                  defaultValue={JSON.stringify(product.externalLinks, null, 2)}
                  className="w-full p-4 rounded-xl border bg-background font-mono text-xs"
                  required
                />
                <p className="text-[10px] text-muted-foreground">
                  Format: {`[{ "store": "Amazon", "url": "...", "isAffiliate": true }]`}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-8">
          <div className="bg-card border rounded-3xl p-8 space-y-6">
            <h2 className="text-xl font-bold">Details &amp; Tags</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={6}
                  defaultValue={product.description}
                  className="w-full p-4 rounded-xl border bg-background"
                  required
                />
              </div>
              <div className="flex gap-8 pb-4 border-b">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="featured"
                    defaultChecked={product.featured}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-bold">Featured Product</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="trending"
                    defaultChecked={product.trending}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-bold">Trending Now</span>
                </label>
              </div>

              <div className="pt-4 space-y-4">
                <h3 className="text-sm font-black uppercase tracking-widest text-primary">SEO Settings</h3>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    SEO Title
                  </label>
                  <input
                    name="seoTitle"
                    defaultValue={product.seo?.title || ''}
                    className="w-full h-12 px-4 rounded-xl border bg-background"
                    placeholder="Meta title for search engines"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    SEO Description
                  </label>
                  <textarea
                    name="seoDescription"
                    rows={3}
                    defaultValue={product.seo?.description || ''}
                    className="w-full p-4 rounded-xl border bg-background text-sm"
                    placeholder="Meta description for search results"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full h-16 text-xl font-black rounded-3xl shadow-xl hover:scale-[1.02] transition-transform"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
