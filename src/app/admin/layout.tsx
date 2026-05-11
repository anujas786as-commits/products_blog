import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, Tag, ShoppingCart, FileText, Globe, LogOut, Home } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:flex flex-col">
        <div className="p-6 border-b">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <span className="font-black tracking-tight text-xl">Admin Panel</span>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <AdminNavLink href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <AdminNavLink href="/admin/categories" icon={<Tag size={20} />} label="Categories" />
          <AdminNavLink href="/admin/products" icon={<ShoppingCart size={20} />} label="Products" />
          <AdminNavLink href="/admin/blogs" icon={<FileText size={20} />} label="Blogs" />
          <div className="pt-4 mt-4 border-t">
            <AdminNavLink href="/" icon={<Home size={20} />} label="View Site" />
            <AdminNavLink href="/admin/logout" icon={<LogOut size={20} />} label="Logout" />
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-card border-b flex items-center justify-between px-8 md:hidden">
           <span className="font-bold">Admin Panel</span>
           {/* Mobile menu trigger could go here */}
        </header>
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}

function AdminNavLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link 
      href={href} 
      className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-primary/10 hover:text-primary transition-all font-medium text-muted-foreground"
    >
      {icon}
      {label}
    </Link>
  );
}

import { ShieldCheck } from 'lucide-react';
