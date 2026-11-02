'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/lib/mockData';

export default function FeaturedProductsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const products = getFeaturedProducts();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const items = entry.target.querySelectorAll('.reveal-up');
            items.forEach((el, i) => {
              setTimeout(() => el.classList.add('visible'), i * 80);
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
    <section ref={sectionRef} className="py-14 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="reveal-up flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Selección</p>
            <h2 className="text-section-title text-foreground">Productos Destacados</h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-primary hover:text-secondary transition-colors">
            Ver catálogo
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {products?.slice(0, 8)?.map((product, i) => (
            <div
              key={product?.id}
              className="reveal-up"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}