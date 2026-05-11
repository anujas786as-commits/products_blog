import React from 'react';
import { ShoppingBag, Users, ShieldCheck, Zap, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <header className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6">About BestPicks</h1>
        <p className="text-xl text-muted-foreground">
          We simplify your shopping journey by finding the highest-rated products from top marketplaces.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <div className="p-8 bg-card border rounded-3xl">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
            <Users className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Who We Are</h2>
          <p className="text-muted-foreground leading-relaxed">
            BestPicks is a team of product enthusiasts dedicated to cutting through the noise of online shopping. We spend hours researching specifications, reading user reviews, and comparing prices to bring you only the best.
          </p>
        </div>

        <div className="p-8 bg-card border rounded-3xl">
          <div className="h-12 w-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-6">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
          <p className="text-muted-foreground leading-relaxed">
            Our mission is to help you make informed purchasing decisions. We believe that everyone deserves high-quality products without the stress of endless searching.
          </p>
        </div>
      </div>

      <section className="bg-primary text-primary-foreground p-12 rounded-3xl text-center mb-20">
        <h2 className="text-3xl font-bold mb-6">Transparency is Key</h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto leading-relaxed">
          While we use affiliate links to support our research, our recommendations are always based on merit. We only showcase products that meet our high standards for quality, value, and reliability.
        </p>
      </section>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-8">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex flex-col items-center text-center">
             <div className="h-10 w-10 text-primary mb-4"><Zap className="h-6 w-6" /></div>
             <h3 className="font-bold mb-2">Fast Research</h3>
             <p className="text-sm text-muted-foreground">We do the legwork so you can find what you need in seconds.</p>
          </div>
          <div className="flex flex-col items-center text-center">
             <div className="h-10 w-10 text-primary mb-4"><Award className="h-6 w-6" /></div>
             <h3 className="font-bold mb-2">Curated Lists</h3>
             <p className="text-sm text-muted-foreground">Only the top 1% of products make it to our featured lists.</p>
          </div>
          <div className="flex flex-col items-center text-center">
             <div className="h-10 w-10 text-primary mb-4"><ShoppingBag className="h-6 w-6" /></div>
             <h3 className="font-bold mb-2">Marketplace Wide</h3>
             <p className="text-sm text-muted-foreground">Compare prices across Amazon, Flipkart, Meesho, and more.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
