import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IProduct } from '@/models/Product';

interface ProductCardProps {
  product: any; // Using any for now to simplify, ideally should be IProduct (with populated category)
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const primaryLink = product.externalLinks?.[0];

  return (
    <div className="group relative bg-card rounded-lg border shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* Image */}
      <Link href={`/product/${product.slug}`} className="block relative aspect-square overflow-hidden bg-muted">
        {product.images?.[0] ? (
          <Image
            src={product.images[0]}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">No image</div>
        )}
        {product.featured && (
          <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded uppercase">
            Featured
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            {product.category?.name || 'Uncategorized'}
          </span>
          {product.rating && product.rating > 0 && (
            <div className="flex items-center text-yellow-500 text-xs">
              <Star className="h-3 w-3 fill-current mr-0.5" />
              <span>{product.rating}</span>
            </div>
          )}
        </div>

        <Link href={`/product/${product.slug}`}>
          <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>

        {product.price && (
          <p className="text-lg font-bold mb-4">₹{product.price.toLocaleString()}</p>
        )}

        <div className="flex items-center gap-2">
          <Link href={`/product/${product.slug}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs">
              View Details
            </Button>
          </Link>
          {primaryLink && (
            <a href={primaryLink.url} target="_blank" rel="noopener noreferrer" className="flex-1">
              <Button size="sm" className="w-full text-xs">
                Buy Now
                <ExternalLink className="h-3 w-3 ml-1" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
