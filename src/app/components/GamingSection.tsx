'use client';
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { getGamingProducts, formatPrice } from '@/lib/mockData';

const GAMING_SUBCATEGORIES = [
  { label: 'PCs Gaming', icon: 'ComputerDesktopIcon', href: '/catalog?category=computadoras&sub=gaming' },
  { label: 'GPUs', icon: 'CpuChipIcon', href: '/catalog?category=componentes&sub=gpu' },
  { label: 'Procesadores', icon: 'CpuChipIcon', href: '/catalog?category=componentes&sub=cpu' },
  { label: 'Monitores', icon: 'ComputerDesktopIcon', href: '/catalog?category=monitores' },
  { label: 'Teclados', icon: 'ComputerDesktopIcon', href: '/catalog?category=perifericos&sub=teclado' },
  { label: 'Mouse', icon: 'CursorArrowRaysIcon', href: '/catalog?category=perifericos&sub=mouse' },
  { label: 'Headsets', icon: 'SpeakerWaveIcon', href: '/catalog?category=perifericos&sub=headset' },
];

export default function GamingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const products = getGamingProducts().slice(0, 4);

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-14 gaming-gradient relative overflow-hidden">
      {/* Accent glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] pointer-events-none">
        <div className="blob-accent w-full h-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="reveal-up flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-accent mb-1">Performance</p>
            <h2 className="text-section-title text-white">SURNOVA Gaming</h2>
            <p className="text-white/50 text-sm mt-1">Equipo de alto rendimiento para conquistar</p>
          </div>
          <Link href="/catalog?category=gaming" className="text-sm font-semibold text-accent hover:text-white transition-colors flex items-center gap-1">
            Ver todo
            <Icon name="ArrowRightIcon" size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left: subcategory tiles */}
          <div className="lg:col-span-1">
            <div className="reveal-up grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-2">
              {GAMING_SUBCATEGORIES.map((sub, i) => (
                <Link
                  key={sub.label}
                  href={sub.href}
                  className="group flex items-center gap-2 px-3 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-accent/10 hover:border-accent/30 transition-all duration-200"
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <Icon name={sub.icon as Parameters<typeof Icon>[0]['name']} size={16} className="text-accent shrink-0" />
                  <span className="text-sm font-semibold text-white/80 group-hover:text-white">{sub.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: gaming products */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-3">
            {products.map((product, i) => (
              <Link
                key={product.id}
                href={`/product-detail?sku=${product.sku}`}
                className="reveal-up group block"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <div className="rounded-xl border border-white/10 bg-white/5 overflow-hidden hover:border-accent/30 hover:bg-white/10 transition-all duration-300">
                  <div className="relative overflow-hidden aspect-video">
                    <AppImage
                      src={product.images[0]}
                      alt={`${product.name} gaming - SURNOVA`}
                      fill
                      sizes="(max-width: 640px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.discount && (
                      <span className="absolute top-2 left-2 badge-discount">-{product.discount}%</span>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-xs text-white/40 font-semibold mb-0.5">{product.brand}</p>
                    <p className="text-sm font-bold text-white line-clamp-2 mb-2">{product.name}</p>
                    <p className="text-sm font-extrabold text-accent">{formatPrice(product.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}