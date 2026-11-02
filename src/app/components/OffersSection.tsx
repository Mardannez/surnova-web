'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';

import { getOfferProducts, formatPrice } from '@/lib/mockData';

export default function OffersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const products = getOfferProducts()?.slice(0, 4);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-up');
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 100);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef?.current) observer?.observe(sectionRef?.current);
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="reveal-up flex items-end justify-between mb-8">
          <div className="flex items-center gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-red-500 mb-1">Tiempo limitado</p>
              <h2 className="text-section-title text-foreground">Ofertas SURNOVA</h2>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 bg-red-50 border border-red-200 rounded-lg px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-xs font-bold text-red-600">ACTIVAS</span>
            </div>
          </div>
          <Link href="/catalog?filter=ofertas" className="text-sm font-semibold text-primary hover:text-secondary transition-colors">
            Ver todas
          </Link>
        </div>

        {/* Offer cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {products?.map((product, i) => {
            const savings = (product?.originalPrice || product?.price) - product?.price;
            return (
              <Link
                key={product?.id}
                href={`/product-detail?sku=${product?.sku}`}
                className="reveal-up group block"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl hover:border-red-200 transition-all duration-300 hover:-translate-y-1">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-[4/3] bg-muted">
                    <AppImage
                      src={product?.images?.[0]}
                      alt={`${product?.name} en oferta - SURNOVA`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product?.discount && (
                      <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        -{product?.discount}%
                      </div>
                    )}
                  </div>
                  {/* Info */}
                  <div className="p-4">
                    <p className="text-xs text-muted-foreground font-semibold mb-1">{product?.brand}</p>
                    <p className="text-sm font-bold text-foreground line-clamp-2 mb-3">{product?.name}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-lg font-extrabold text-foreground">{formatPrice(product?.price)}</p>
                    </div>
                    {product?.originalPrice && (
                      <div className="flex items-center gap-2">
                        <p className="text-xs text-muted-foreground line-through">{formatPrice(product?.originalPrice)}</p>
                        <span className="text-xs font-bold text-green-600">Ahorras {formatPrice(savings)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}