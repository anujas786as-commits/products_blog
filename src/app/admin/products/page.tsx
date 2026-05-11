import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Plus, Edit, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Product from '@/models/Product';
import { deleteProduct } from '../actions';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminProductsPage() {
  await dbConnect();
  const products = await Product.find({}).populate('category').sort({ createdAt: -1 });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Products</h1>
          <p className="text-muted-foreground">Manage your affiliate product listings</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-card border rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Product</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Category</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((prod) => (
              <tr key={prod._id.toString()} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 relative rounded-lg overflow-hidden border">
                       {prod.images?.[0] && <Image src={prod.images[0]} alt={prod.title} fill className="object-cover" />}
                    </div>
                    <div>
                      <p className="font-bold text-sm line-clamp-1">{prod.title}</p>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{prod.brand}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                   <span className="text-xs font-bold px-2 py-1 bg-muted rounded-full">
                     {prod.category?.name || 'No Category'}
                   </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/product/${prod.slug}`} target="_blank">
                      <Button variant="ghost" size="icon"><ExternalLink size={16} /></Button>
                    </Link>
                    <DeleteButton id={prod._id.toString()} action={deleteProduct} label="product" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
