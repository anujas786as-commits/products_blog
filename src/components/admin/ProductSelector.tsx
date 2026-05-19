'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, ChevronDown, X, ShoppingBag, Check, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Product {
  _id: string;
  title: string;
}

interface ProductSelectorProps {
  products: Product[];
  defaultSelectedIds?: string[];
}

export default function ProductSelector({ products, defaultSelectedIds = [] }: ProductSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState<string[]>(defaultSelectedIds);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(p => 
      p.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  const selectedProducts = useMemo(() => {
    return products.filter(p => selectedIds.includes(p._id));
  }, [products, selectedIds]);

  const toggleProduct = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-4" ref={dropdownRef}>
      {/* Hidden input for form submission */}
      <input type="hidden" name="relatedProducts" value={selectedIds.join(',')} />

      <div className="relative">
        <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-2 block">
          Select Linked Products
        </label>
        
        {/* The "Trigger" Button / Input Hybrid */}
        <div 
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            "w-full min-h-[48px] px-4 py-2 rounded-xl border bg-background flex items-center justify-between cursor-pointer transition-all",
            isOpen ? "ring-2 ring-primary border-primary" : "hover:border-primary/50"
          )}
        >
          <div className="flex flex-wrap gap-1.5 flex-1 pr-2">
            {selectedProducts.length > 0 ? (
              selectedProducts.map(p => (
                <span key={p._id} className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 border border-primary/20">
                  {p.title.split(' ').slice(0, 3).join(' ')}
                  <X 
                    size={12} 
                    className="hover:text-destructive cursor-pointer" 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleProduct(p._id);
                    }} 
                  />
                </span>
              ))
            ) : (
              <span className="text-muted-foreground text-sm">Choose products...</span>
            )}
          </div>
          <ChevronDown size={18} className={cn("text-muted-foreground transition-transform", isOpen && "rotate-180")} />
        </div>

        {/* The Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-50 w-full mt-2 bg-card border rounded-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
            {/* Internal Search Bar */}
            <div className="p-3 border-b sticky top-0 bg-card rounded-t-2xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={14} />
                <input
                  autoFocus
                  placeholder="Search products..."
                  className="w-full h-10 pl-9 pr-4 text-sm bg-muted/50 rounded-lg outline-none focus:bg-muted transition-colors"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Product List */}
            <div className="max-h-60 overflow-y-auto p-2 space-y-1">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(p => {
                  const isSelected = selectedIds.includes(p._id);
                  return (
                    <button
                      key={p._id}
                      type="button"
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-xl transition-all flex items-center justify-between group",
                        isSelected ? "bg-primary/10 text-primary" : "hover:bg-muted"
                      )}
                      onClick={() => toggleProduct(p._id)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "h-4 w-4 rounded border flex items-center justify-center transition-colors",
                          isSelected ? "bg-primary border-primary" : "border-muted-foreground/30 group-hover:border-primary"
                        )}>
                          {isSelected && <Check size={10} className="text-white" />}
                        </div>
                        <span className="text-sm font-medium">{p.title}</span>
                      </div>
                      {isSelected ? (
                        <Check size={14} className="text-primary" />
                      ) : (
                        <Plus size={14} className="text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="py-8 text-center">
                  <ShoppingBag className="mx-auto h-8 w-8 text-muted-foreground/30 mb-2" />
                  <p className="text-sm text-muted-foreground">No products found</p>
                </div>
              )}
            </div>

            {/* Footer Summary */}
            <div className="p-3 bg-muted/30 rounded-b-2xl border-t flex justify-between items-center">
               <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                 {selectedIds.length} Selected
               </span>
               <button 
                 type="button" 
                 onClick={() => setIsOpen(false)}
                 className="text-[10px] font-black text-primary uppercase hover:underline"
               >
                 Done
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
