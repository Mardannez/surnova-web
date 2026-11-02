'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { CATEGORIES } from '@/lib/mockData';

export default function CategoriesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.cat-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 60);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Explorar</p>
            <h2 className="text-section-title text-foreground">Categorías</h2>
          </div>
          <Link href="/catalog" className="text-sm font-semibold text-primary hover:text-secondary transition-colors flex items-center gap-1">
            Ver todo
          </Link>
        </div>

        {/* BENTO AUDIT: 10 cards, grid-cols-2 md:grid-cols-5
            Row 1: [Laptops] [Computadoras] [Gaming] [Componentes] [Monitores]
            Row 2: [Periféricos] [Almacenamiento] [Redes] [Impresión] [Accesorios]
            Placed 10/10 ✓ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {CATEGORIES.map((cat, i) => (
            <Link
              key={cat.id}
              href={`/catalog?category=${cat.id}`}
              className="cat-card group block"
              style={{
                opacity: 0,
                transform: 'translateY(16px)',
                transition: `all 0.5s cubic-bezier(0.22,1,0.36,1)`,
              }}
            >
              <div className="relative overflow-hidden rounded-xl aspect-square bg-muted border border-border group-hover:border-primary/30 group-hover:shadow-lg transition-all duration-300">
                <AppImage
                  src={cat.image}
                  alt={`${cat.name} - SURNOVA Honduras`}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <p className="text-white font-bold text-sm leading-tight">{cat.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}