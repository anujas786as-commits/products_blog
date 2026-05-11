import React from 'react';
import { Tag, ShoppingCart, FileText, MousePointerClick } from 'lucide-react';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Blog from '@/models/Blog';
import Click from '@/models/Click';
import dbConnect from '@/lib/mongodb';

export default async function AdminDashboard() {
  await dbConnect();
  
  const [catCount, prodCount, blogCount, clickCount] = await Promise.all([
    Category.countDocuments(),
    Product.countDocuments(),
    Blog.countDocuments(),
    Click.countDocuments(),
  ]);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-black">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your affiliate platform</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard icon={<Tag className="text-blue-500" />} label="Categories" value={catCount} />
        <StatsCard icon={<ShoppingCart className="text-green-500" />} label="Products" value={prodCount} />
        <StatsCard icon={<FileText className="text-purple-500" />} label="Blog Posts" value={blogCount} />
        <StatsCard icon={<MousePointerClick className="text-orange-500" />} label="Total Clicks" value={clickCount} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-card border rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-6">Recent Activity</h2>
          <p className="text-muted-foreground text-sm">Real-time stats coming soon...</p>
        </div>
        <div className="bg-card border rounded-3xl p-8">
          <h2 className="text-xl font-bold mb-6">Platform Health</h2>
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Database Connection</span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
             </div>
             <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Image Hosting (Unsplash)</span>
                <span className="h-2.5 w-2.5 rounded-full bg-green-500"></span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="bg-card border rounded-3xl p-6 flex items-center gap-4">
      <div className="h-12 w-12 bg-muted rounded-2xl flex items-center justify-center">
        {icon}
      </div>
      <div>
        <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
        <p className="text-2xl font-black">{value}</p>
      </div>
    </div>
  );
}
