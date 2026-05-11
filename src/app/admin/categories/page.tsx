import React from 'react';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Category from '@/models/Category';
import { deleteCategory } from '../actions';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminCategoriesPage() {
  await dbConnect();
  const categories = await Category.find({}).sort({ name: 1 });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Categories</h1>
          <p className="text-muted-foreground">Manage your product categories</p>
        </div>
        <Link href="/admin/categories/new">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Add Category
          </Button>
        </Link>
      </div>

      <div className="bg-card border rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Name</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Slug</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((cat) => (
              <tr key={cat._id.toString()} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-bold">{cat.name}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">{cat.slug}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/admin/categories/${cat._id}`}>
                      <Button variant="ghost" size="icon"><Edit size={16} /></Button>
                    </Link>
                    <DeleteButton id={cat._id.toString()} action={deleteCategory} label="category" />
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
