'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Product, formatPrice } from '@/lib/mockData';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [favorited, setFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    setFavorited(!favorited);
  };

  const isAvailable = product.stock > 0;
  const isExternal = product.inventoryType === 'external';

  return (
    <Link href={`/product-detail?sku=${product.sku}`} className="group block">
      <div className="product-card h-full flex flex-col">
        {/* Image */}
        <div className="relative overflow-hidden bg-muted aspect-square">
          <AppImage
            src={product.images[0]}
            alt={`${product.brand} ${product.name} - disponible en SURNOVA Honduras`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover product-card-img"
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.discount && (
              <span className="badge-discount">-{product.discount}%</span>
            )}
            {product.offer && (
              <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">OFERTA</span>
            )}
          </div>
          {/* Favorite */}
          <button
            onClick={handleFavorite}
            className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform"
            aria-label={favorited ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          >
            <Icon
              name={favorited ? 'HeartIcon' : 'HeartIcon'}
              variant={favorited ? 'solid' : 'outline'}
              size={15}
              className={favorited ? 'text-red-500' : 'text-muted-foreground'}
            />
          </button>
          {/* Stock badge */}
          <div className="absolute bottom-2 left-2">
            {!isAvailable ? (
              <span className="badge-stock bg-red-100 text-red-600">Sin stock</span>
            ) : isExternal ? (
              <span className="badge-stock bg-amber-100 text-amber-700">Bajo pedido</span>
            ) : (
              <span className="badge-stock bg-green-100 text-green-700">Disponible</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 p-4 gap-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{product.brand}</p>
          <h3 className="text-sm font-semibold text-foreground line-clamp-2 leading-snug">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="StarIcon"
                  variant={i < Math.floor(product.rating) ? 'solid' : 'outline'}
                  size={12}
                  className={i < Math.floor(product.rating) ? 'text-amber-400' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
            <span className="text-[11px] text-muted-foreground">({product.reviews})</span>
          </div>

          {/* Price */}
          <div className="mt-auto pt-2 flex items-end justify-between">
            <div>
              <p className="text-base font-bold text-foreground">{formatPrice(product.price)}</p>
              {product.originalPrice && (
                <p className="text-xs text-muted-foreground line-through">{formatPrice(product.originalPrice)}</p>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all ${
                addedToCart
                  ? 'bg-green-500 text-white scale-95' :'bg-primary text-white hover:bg-secondary'
              }`}
              aria-label="Agregar al carrito"
            >
              <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingCartIcon'} size={16} />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}