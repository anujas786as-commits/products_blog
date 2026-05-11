import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Mail, Globe, Share2 } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold tracking-tight">BestPicks</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Helping you find the best products from top marketplaces like Amazon, Flipkart, and Meesho.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-primary">Home</Link></li>
              <li><Link href="/blogs" className="hover:text-primary">Blogs</Link></li>
              <li><Link href="/about" className="hover:text-primary">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact</Link></li>
              <li><Link href="/admin" className="hover:text-primary font-bold text-primary/80">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-bold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/disclaimer" className="hover:text-primary">Disclaimer</Link></li>
              <li><Link href="/affiliate-disclosure" className="hover:text-primary">Affiliate Disclosure</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-bold mb-4">Stay Connected</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-primary"><Mail className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Globe className="h-5 w-5" /></a>
              <a href="#" className="hover:text-primary"><Share2 className="h-5 w-5" /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} BestPicks. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
