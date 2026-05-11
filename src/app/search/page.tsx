import Link from 'next/link';
import { searchProducts, getAllProducts } from '@/services/productService';
import ProductCard from '@/components/product/ProductCard';
import { Search as SearchIcon, Filter, SlidersHorizontal } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default async function SearchPage({ searchParams }: { searchParams: { q?: string, filter?: string } }) {
  const query = searchParams.q || '';
  const filter = searchParams.filter || '';
  
  let products = [];
  
  if (query) {
    products = await searchProducts(query);
  } else if (filter === 'featured') {
    products = await getAllProducts({ featured: true });
  } else if (filter === 'trending') {
    products = await getAllProducts({ trending: true });
  } else {
    products = await getAllProducts();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12">
        <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
          <SearchIcon className="h-8 w-8 text-primary" />
          {query ? `Search Results for "${query}"` : 'Discover Products'}
        </h1>
        <p className="text-muted-foreground">
          {products.length} products found
        </p>
      </header>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Filters Sidebar (Mobile trigger, Desktop fixed) */}
        <aside className="w-full lg:w-64 space-y-8">
          <div className="flex items-center justify-between lg:hidden mb-4 p-4 bg-muted rounded-xl">
             <span className="font-bold flex items-center gap-2"><Filter className="h-4 w-4" /> Filters</span>
             <Button variant="ghost" size="sm"><SlidersHorizontal className="h-4 w-4" /></Button>
          </div>
          
          <div className="hidden lg:block space-y-8">
            <div>
              <h3 className="font-bold mb-4 uppercase tracking-widest text-[10px] text-muted-foreground">Quick Filters</h3>
              <div className="flex flex-col gap-2">
                <Link href="/search?filter=featured" className={cn(buttonVariants({ variant: filter === 'featured' ? 'default' : 'ghost' }), "justify-start text-xs font-bold h-9")}>
                   Featured Picks
                </Link>
                <Link href="/search?filter=trending" className={cn(buttonVariants({ variant: filter === 'trending' ? 'default' : 'ghost' }), "justify-start text-xs font-bold h-9")}>
                   Trending Now
                </Link>
                <Link href="/search" className={cn(buttonVariants({ variant: !filter && !query ? 'default' : 'ghost' }), "justify-start text-xs font-bold h-9")}>
                   All Products
                </Link>
              </div>
            </div>
          </div>
        </aside>

        {/* Results Grid */}
        <div className="flex-1">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product: any) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-32 bg-muted/20 rounded-3xl border-2 border-dashed">
              <p className="text-xl text-muted-foreground italic mb-6">No products matched your search.</p>
              <Link href="/search" className={cn(buttonVariants())}>
                Browse All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
