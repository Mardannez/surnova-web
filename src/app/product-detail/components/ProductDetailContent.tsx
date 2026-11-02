'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS, formatPrice } from '@/lib/mockData';

export default function ProductDetailContent() {
  // Mock: use first product as detail
  const product = PRODUCTS?.[0];
  const relatedProducts = PRODUCTS?.filter(p => p?.category === product?.category && p?.id !== product?.id)?.slice(0, 4);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [favorited, setFavorited] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const isExternal = product?.inventoryType === 'external';
  const savings = product?.originalPrice ? product?.originalPrice - product?.price : 0;

  const handleAddToCart = () => {
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      `Hola SURNOVA, estoy interesado en ${product?.name}, SKU ${product?.sku}.`
    );
    window.open(`https://wa.me/50499999999?text=${msg}`, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
        <Link href="/" className="hover:text-foreground transition-colors">Inicio</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href="/catalog" className="hover:text-foreground transition-colors">Catálogo</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <Link href={`/catalog?category=${product?.category}`} className="hover:text-foreground transition-colors capitalize">{product?.category}</Link>
        <Icon name="ChevronRightIcon" size={14} />
        <span className="text-foreground font-medium truncate max-w-[200px]">{product?.name}</span>
      </nav>
      <div className="grid lg:grid-cols-2 gap-10 mb-16">
        {/* Gallery */}
        <div className="flex flex-col gap-4">
          <div className="relative overflow-hidden rounded-2xl bg-muted border border-border aspect-square">
            <AppImage
              src={product?.images?.[selectedImage]}
              alt={`${product?.name} - imagen ${selectedImage + 1} - SURNOVA Honduras`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {product?.discount && (
              <div className="absolute top-4 left-4 badge-discount text-sm px-2 py-1">
                -{product?.discount}%
              </div>
            )}
          </div>
          {product?.images?.length > 1 && (
            <div className="flex gap-3">
              {product?.images?.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === i ? 'border-primary shadow-md' : 'border-border hover:border-primary/50'
                  }`}
                >
                  <AppImage
                    src={img}
                    alt={`${product?.name} miniatura ${i + 1}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          {/* Brand & SKU */}
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{product?.brand}</span>
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono">SKU: {product?.sku}</span>
          </div>

          {/* Name */}
          <h1 className="text-2xl md:text-3xl font-extrabold text-foreground leading-tight">{product?.name}</h1>

          {/* Model */}
          <p className="text-sm text-muted-foreground">Modelo: <span className="font-semibold text-foreground">{product?.model}</span></p>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)]?.map((_, i) => (
                <Icon
                  key={i}
                  name="StarIcon"
                  variant={i < Math.floor(product?.rating) ? 'solid' : 'outline'}
                  size={16}
                  className={i < Math.floor(product?.rating) ? 'text-amber-400' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">{product?.rating}</span>
            <span className="text-sm text-muted-foreground">({product?.reviews} reseñas)</span>
          </div>

          {/* Price */}
          <div className="bg-muted/50 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-extrabold text-foreground">{formatPrice(product?.price)}</span>
              {product?.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">{formatPrice(product?.originalPrice)}</span>
              )}
            </div>
            {savings > 0 && (
              <div className="flex items-center gap-2">
                <span className="badge-discount">-{product?.discount}%</span>
                <span className="text-sm font-semibold text-green-600">Ahorras {formatPrice(savings)}</span>
              </div>
            )}
          </div>

          {/* Availability */}
          <div className="flex items-center gap-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-semibold ${
              product?.stock === 0
                ? 'bg-red-100 text-red-700'
                : isExternal
                ? 'bg-amber-100 text-amber-700' :'bg-green-100 text-green-700'
            }`}>
              <span className={`w-2 h-2 rounded-full ${
                product?.stock === 0 ? 'bg-red-500' : isExternal ? 'bg-amber-500' : 'bg-green-500'
              }`} />
              {product?.stock === 0 ? 'Sin stock' : isExternal ? 'Disponible bajo pedido' : 'Disponible'}
            </div>
            {isExternal && (
              <span className="text-xs text-muted-foreground">Entrega estimada: 2 a 4 días</span>
            )}
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Icon name="ShieldCheckIcon" size={14} className="text-primary" />
              <span>{product?.warranty}</span>
            </div>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-foreground">Cantidad:</span>
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Icon name="MinusIcon" size={16} />
              </button>
              <span className="w-12 h-10 flex items-center justify-center font-bold text-sm border-x border-border">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(q => Math.min(product?.stock || 99, q + 1))}
                className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <Icon name="PlusIcon" size={16} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm transition-all ${
                  addedToCart
                    ? 'bg-green-500 text-white' :'bg-primary text-white hover:bg-secondary'
                }`}
              >
                <Icon name={addedToCart ? 'CheckIcon' : 'ShoppingCartIcon'} size={18} />
                {addedToCart ? '¡Agregado!' : 'Agregar al carrito'}
              </button>
              <button
                onClick={() => setFavorited(!favorited)}
                className={`w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-all ${
                  favorited ? 'border-red-400 bg-red-50 text-red-500' : 'border-border hover:border-primary text-muted-foreground'
                }`}
                aria-label="Favoritos"
              >
                <Icon name="HeartIcon" variant={favorited ? 'solid' : 'outline'} size={20} />
              </button>
            </div>
            <Link href="/checkout" className="btn-primary w-full py-3 text-base justify-center">
              Comprar ahora
            </Link>
            <button
              onClick={handleWhatsApp}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border border-green-300 bg-green-50 text-green-700 font-bold text-sm hover:bg-green-100 transition-all"
            >
              <Icon name="ChatBubbleLeftRightIcon" size={18} />
              Consultar por WhatsApp
            </button>
          </div>
        </div>
      </div>
      {/* Specs */}
      <div className="mb-16">
        <h2 className="text-xl font-bold text-foreground mb-6">Especificaciones técnicas</h2>
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
          {Object.entries(product?.specs)?.map(([key, value], i) => (
            <div
              key={key}
              className={`flex items-center gap-4 px-6 py-4 ${i % 2 === 0 ? 'bg-muted/30' : 'bg-card'}`}
            >
              <span className="text-sm font-bold text-muted-foreground w-40 shrink-0">{key}</span>
              <span className="text-sm font-semibold text-foreground">{value}</span>
            </div>
          ))}
        </div>
      </div>
      {/* Related */}
      {relatedProducts?.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6">Productos relacionados</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {relatedProducts?.map(p => (
              <ProductCard key={p?.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}