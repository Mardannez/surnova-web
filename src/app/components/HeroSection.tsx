'use client';
import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface CarouselSlide {
  id: number;
  category: string;
  categoryLabel: string;
  badge: string;
  headline: string;
  subheadline: string;
  productName: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
  accentColor: string;
  bgGradient: string;
}

const SLIDES: CarouselSlide[] = [
{
  id: 1,
  category: 'laptops',
  categoryLabel: 'Laptops',
  badge: 'Más vendido',
  headline: 'Potencia sin límites',
  subheadline: 'Trabaja, crea y juega con la laptop perfecta para ti.',
  productName: 'Lenovo LOQ 15 Gaming',
  brand: 'Lenovo',
  originalPrice: 32000,
  salePrice: 28500,
  discount: 11,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_101545d80-1787376365400.png",
  imageAlt: 'Laptop gaming Lenovo LOQ 15 con RTX 4060 disponible en Honduras',
  ctaLabel: 'Ver laptops',
  ctaHref: '/catalog?category=laptops',
  accentColor: '#E8FF47',
  bgGradient: 'from-[#0a0f1e] via-[#0d1530] to-[#0a0f1e]'
},
{
  id: 2,
  category: 'gaming',
  categoryLabel: 'Gaming',
  badge: 'Oferta gaming',
  headline: 'Domina cada partida',
  subheadline: 'Equipos gaming de alto rendimiento para llevar tu juego al siguiente nivel.',
  productName: 'ASUS ROG Strix G16',
  brand: 'ASUS ROG',
  originalPrice: 45000,
  salePrice: 37800,
  discount: 16,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_181e7f42f-1772469691316.png",
  imageAlt: 'Setup gaming ASUS ROG con iluminación RGB y monitor de alta frecuencia',
  ctaLabel: 'Ver gaming',
  ctaHref: '/catalog?category=gaming',
  accentColor: '#ff4d6d',
  bgGradient: 'from-[#130a1e] via-[#1a0d2e] to-[#130a1e]'
},
{
  id: 3,
  category: 'monitores',
  categoryLabel: 'Monitores',
  badge: 'Descuento especial',
  headline: 'Cada píxel importa',
  subheadline: 'Monitores 4K y alta frecuencia para trabajo profesional y gaming.',
  productName: 'LG UltraGear 27" 4K',
  brand: 'LG',
  originalPrice: 18500,
  salePrice: 15200,
  discount: 18,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1a02c534b-1772091922013.png",
  imageAlt: 'Monitor LG UltraGear 27 pulgadas 4K para gaming y diseño profesional',
  ctaLabel: 'Ver monitores',
  ctaHref: '/catalog?category=monitores',
  accentColor: '#38bdf8',
  bgGradient: 'from-[#071520] via-[#0a1e30] to-[#071520]'
},
{
  id: 4,
  category: 'componentes',
  categoryLabel: 'Componentes',
  badge: 'Arma tu PC',
  headline: 'Construye tu máquina ideal',
  subheadline: 'Procesadores, GPUs y RAM de última generación para tu build.',
  productName: 'NVIDIA GeForce RTX 4070',
  brand: 'NVIDIA',
  originalPrice: 28000,
  salePrice: 23500,
  discount: 16,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e77cf40b-1772174255365.png",
  imageAlt: 'Tarjeta gráfica NVIDIA GeForce RTX 4070 para gaming y diseño 3D',
  ctaLabel: 'Ver componentes',
  ctaHref: '/catalog?category=componentes',
  accentColor: '#4ade80',
  bgGradient: 'from-[#071a0f] via-[#0a2015] to-[#071a0f]'
},
{
  id: 5,
  category: 'perifericos',
  categoryLabel: 'Periféricos',
  badge: 'Kit completo',
  headline: 'El detalle que marca la diferencia',
  subheadline: 'Teclados mecánicos, mouse de precisión y headsets para tu setup.',
  productName: 'Logitech MX Keys + MX Master 3',
  brand: 'Logitech',
  originalPrice: 8500,
  salePrice: 6800,
  discount: 20,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_182ae3c63-1787376366043.png",
  imageAlt: 'Teclado mecánico y mouse Logitech MX para productividad y gaming',
  ctaLabel: 'Ver periféricos',
  ctaHref: '/catalog?category=perifericos',
  accentColor: '#fb923c',
  bgGradient: 'from-[#1a0e07] via-[#22150a] to-[#1a0e07]'
}];


function formatPrice(price: number) {
  return `L ${price.toLocaleString('es-HN')}`;
}

export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (isAnimating) return;
    setDirection(dir);
    setIsAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setIsAnimating(false);
    }, 350);
  }, [isAnimating]);

  const goNext = useCallback(() => {
    goTo((current + 1) % SLIDES.length, 'next');
  }, [current, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + SLIDES.length) % SLIDES.length, 'prev');
  }, [current, goTo]);

  useEffect(() => {
    intervalRef.current = setInterval(goNext, 5500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [goNext]);

  const resetInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 5500);
  };

  const handleDotClick = (i: number) => {
    const dir = i > current ? 'next' : 'prev';
    goTo(i, dir);
    resetInterval();
  };

  const handlePrev = () => {goPrev();resetInterval();};
  const handleNext = () => {goNext();resetInterval();};

  const slide = SLIDES[current];
  const savings = slide.originalPrice - slide.salePrice;

  return (
    <section
      className="relative overflow-hidden"
      style={{ minHeight: '88vh' }}
      aria-label="Carrusel de productos destacados SURNOVA">

      {/* Background */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-all duration-700`} />


      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(to right, ${slide.accentColor} 1px, transparent 1px), linear-gradient(to bottom, ${slide.accentColor} 1px, transparent 1px)`,
          backgroundSize: '52px 52px',
          transition: 'background-image 0.7s'
        }} />


      {/* Glow blob */}
      <div
        className="absolute pointer-events-none rounded-full"
        style={{
          width: 600,
          height: 600,
          top: '10%',
          right: '-8%',
          background: `radial-gradient(circle, ${slide.accentColor}18 0%, transparent 70%)`,
          filter: 'blur(60px)',
          transition: 'background 0.7s'
        }} />


      {/* Slide content */}
      <div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center"
        style={{ minHeight: '88vh' }}>

        <div
          className="w-full grid md:grid-cols-2 gap-8 lg:gap-16 items-center py-16"
          style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ?
            `translateX(${direction === 'next' ? '-32px' : '32px'})` :
            'translateX(0)',
            transition: 'opacity 0.35s cubic-bezier(0.22,1,0.36,1), transform 0.35s cubic-bezier(0.22,1,0.36,1)'
          }}>

          {/* Left: Text content */}
          <div className="flex flex-col gap-5">
            {/* Category + badge row */}
            <div className="flex items-center gap-3 flex-wrap">
              <span
                className="text-[10px] font-bold uppercase tracking-[0.35em] px-3 py-1 rounded-full border"
                style={{
                  color: slide.accentColor,
                  borderColor: `${slide.accentColor}40`,
                  background: `${slide.accentColor}12`
                }}>

                {slide.categoryLabel}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50">
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: slide.accentColor }} />

                {slide.badge}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-[1.05] tracking-tight">
              {slide.headline}
            </h1>

            {/* Subheadline */}
            <p className="text-white/55 text-base sm:text-lg font-light leading-relaxed max-w-md">
              {slide.subheadline}
            </p>

            {/* Product info card */}
            <div
              className="flex flex-col gap-3 p-4 rounded-2xl border"
              style={{
                background: 'rgba(255,255,255,0.04)',
                borderColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(8px)'
              }}>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[11px] text-white/40 uppercase tracking-wider font-medium mb-0.5">
                    {slide.brand}
                  </p>
                  <p className="text-white font-semibold text-sm leading-snug">
                    {slide.productName}
                  </p>
                </div>
                {/* Discount badge */}
                <div
                  className="shrink-0 flex items-center justify-center rounded-xl px-3 py-1.5"
                  style={{ background: slide.accentColor }}>

                  <span className="text-black font-extrabold text-sm">
                    -{slide.discount}%
                  </span>
                </div>
              </div>

              {/* Pricing */}
              <div className="flex items-end gap-3">
                <span className="text-3xl font-extrabold text-white">
                  {formatPrice(slide.salePrice)}
                </span>
                <span className="text-white/35 text-sm line-through mb-1">
                  {formatPrice(slide.originalPrice)}
                </span>
              </div>

              {/* Savings pill */}
              <div className="flex items-center gap-2">
                <Icon name="TagIcon" size={13} className="text-white/40" />
                <span className="text-xs text-white/50">
                  Ahorras{' '}
                  <span className="font-bold" style={{ color: slide.accentColor }}>
                    {formatPrice(savings)}
                  </span>
                </span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-xl font-bold text-sm transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
                style={{
                  background: slide.accentColor,
                  color: '#0a0f1e'
                }}>

                {slide.ctaLabel}
                <Icon name="ArrowRightIcon" size={16} />
              </Link>
              <Link
                href="/catalog?filter=ofertas"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm text-white/80 hover:bg-white/10 hover:text-white transition-all duration-200"
                style={{ borderColor: 'rgba(255,255,255,0.15)' }}>

                Todas las ofertas
              </Link>
            </div>
          </div>

          {/* Right: Product image */}
          <div className="relative hidden md:flex items-center justify-center">
            <div
              className="relative w-full max-w-lg rounded-3xl overflow-hidden border"
              style={{
                borderColor: `${slide.accentColor}20`,
                boxShadow: `0 32px 80px -16px ${slide.accentColor}20, 0 0 0 1px rgba(255,255,255,0.04)`
              }}>

              {/* Gradient overlay on image */}
              <div
                className="absolute inset-0 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${slide.accentColor}10 0%, transparent 60%)`
                }} />

              <AppImage
                src={slide.image}
                alt={slide.imageAlt}
                width={640}
                height={420}
                priority={current === 0}
                className="w-full object-cover aspect-[4/3]" />

            </div>

            {/* Floating discount card */}
            <div
              className="absolute -left-6 top-1/2 -translate-y-1/2 rounded-2xl p-3.5 border flex items-center gap-3 shadow-2xl"
              style={{
                background: 'rgba(10,15,30,0.85)',
                borderColor: `${slide.accentColor}30`,
                backdropFilter: 'blur(12px)'
              }}>

              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${slide.accentColor}20` }}>

                <Icon name="TagIcon" size={18} style={{ color: slide.accentColor }} />
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Descuento</p>
                <p className="text-sm font-extrabold text-white">-{slide.discount}% OFF</p>
              </div>
            </div>

            {/* Floating shipping card */}
            <div
              className="absolute -right-4 bottom-10 rounded-2xl p-3.5 border flex items-center gap-3 shadow-2xl"
              style={{
                background: 'rgba(10,15,30,0.85)',
                borderColor: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(12px)'
              }}>

              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                <Icon name="TruckIcon" size={18} className="text-white/70" />
              </div>
              <div>
                <p className="text-[10px] text-white/40 font-medium uppercase tracking-wider">Envío</p>
                <p className="text-sm font-bold text-white">Todo Honduras</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        aria-label="Slide anterior"
        className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 hover:border-white/30 transition-all duration-200">

        <Icon name="ChevronLeftIcon" size={20} />
      </button>
      <button
        onClick={handleNext}
        aria-label="Siguiente slide"
        className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border border-white/15 bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white hover:bg-black/50 hover:border-white/30 transition-all duration-200">

        <Icon name="ChevronRightIcon" size={20} />
      </button>

      {/* Dot indicators + slide counter */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4">
        {/* Dots */}
        <div className="flex items-center gap-2">
          {SLIDES.map((s, i) =>
          <button
            key={s.id}
            onClick={() => handleDotClick(i)}
            aria-label={`Ir al slide ${i + 1}: ${s.categoryLabel}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              background: i === current ? slide.accentColor : 'rgba(255,255,255,0.25)'
            }} />

          )}
        </div>
        {/* Counter */}
        <span className="text-[11px] font-bold text-white/30 tabular-nums">
          {current + 1} / {SLIDES.length}
        </span>
      </div>

      {/* Category quick-nav strip (desktop) */}
      <div className="absolute bottom-6 right-6 z-20 hidden lg:flex items-center gap-2">
        {SLIDES.map((s, i) =>
        <button
          key={s.id}
          onClick={() => handleDotClick(i)}
          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border transition-all duration-200"
          style={{
            color: i === current ? '#0a0f1e' : 'rgba(255,255,255,0.4)',
            background: i === current ? slide.accentColor : 'transparent',
            borderColor: i === current ? slide.accentColor : 'rgba(255,255,255,0.12)'
          }}>

            {s.categoryLabel}
          </button>
        )}
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>);

}