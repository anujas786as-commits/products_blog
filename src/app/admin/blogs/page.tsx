import React from 'react';
import Link from 'next/link';
import { Plus, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import dbConnect from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { deleteBlog } from '../actions';
import DeleteButton from '@/components/admin/DeleteButton';

export default async function AdminBlogsPage() {
  await dbConnect();
  const blogs = await Blog.find({}).sort({ createdAt: -1 });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black">Blogs & Guides</h1>
          <p className="text-muted-foreground">Manage your expert buying guides</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button className="flex items-center gap-2">
            <Plus size={18} /> Add Blog Post
          </Button>
        </Link>
      </div>

      <div className="bg-card border rounded-3xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-muted/50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Title</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground">Date</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-muted-foreground text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {blogs.map((blog) => (
              <tr key={blog._id.toString()} className="hover:bg-muted/30 transition-colors">
                <td className="px-6 py-4 font-bold">{blog.title}</td>
                <td className="px-6 py-4 text-sm text-muted-foreground">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/blog/${blog.slug}`} target="_blank">
                      <Button variant="ghost" size="icon"><Globe size={16} /></Button>
                    </Link>
                    <DeleteButton id={blog._id.toString()} action={deleteBlog} label="blog post" />
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
