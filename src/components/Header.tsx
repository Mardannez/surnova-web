'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

const NAV_LINKS = [
  { label: 'Categorías', href: '/catalog' },
  { label: 'Ofertas', href: '/catalog?filter=ofertas' },
  { label: 'Gaming', href: '/catalog?category=gaming' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartCount] = useState(2);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      const handleScroll = () => setMobileOpen(false);
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-primary/95 backdrop-blur-xl shadow-lg shadow-black/20' : 'bg-primary'
        }`}
      >
        {/* Top bar */}
        <div className="border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 h-10 flex items-center justify-between">
            <p className="text-xs text-white/50">
              🇭🇳 Envíos a todo Honduras · Choluteca y alrededores
            </p>
            <div className="flex items-center gap-4">
              <Link href="/sign-up-login" className="text-xs text-white/60 hover:text-accent transition-colors">
                Mi cuenta
              </Link>
              <span className="text-white/20">|</span>
              <Link href="/sign-up-login" className="text-xs text-white/60 hover:text-accent transition-colors">
                Registrarse
              </Link>
            </div>
          </div>
        </div>

        {/* Main header */}
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <AppLogo size={32} />
            <span className="font-extrabold text-xl tracking-tight text-white hidden sm:block">
              SURNOVA
            </span>
          </Link>

          {/* Search - prominent */}
          <div className="flex-1 max-w-2xl mx-auto">
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e?.target?.value)}
                placeholder="¿Qué tecnología estás buscando?"
                className="w-full h-10 pl-4 pr-12 bg-white/10 border border-white/20 rounded-lg text-sm text-white placeholder-white/40 outline-none focus:border-accent focus:bg-white/15 transition-all"
              />
              <button className="absolute right-0 h-10 w-10 flex items-center justify-center bg-accent rounded-r-lg hover:bg-accent/90 transition-colors">
                <Icon name="MagnifyingGlassIcon" size={18} className="text-foreground" />
              </button>
            </div>
          </div>

          {/* Desktop nav icons */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS?.map(link => (
              <Link
                key={link?.label}
                href={link?.href}
                className="px-3 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              >
                {link?.label}
              </Link>
            ))}
          </div>

          {/* Action icons */}
          <div className="flex items-center gap-1 shrink-0">
            <Link
              href="/sign-up-login"
              className="hidden md:flex items-center justify-center w-10 h-10 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              title="Mi cuenta"
            >
              <Icon name="UserIcon" size={20} />
            </Link>
            <button
              className="hidden md:flex items-center justify-center w-10 h-10 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all"
              title="Favoritos"
            >
              <Icon name="HeartIcon" size={20} />
            </button>
            <Link
              href="/cart"
              className="flex items-center justify-center w-10 h-10 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all relative"
              title="Carrito"
            >
              <Icon name="ShoppingCartIcon" size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-accent text-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex items-center justify-center w-10 h-10 text-white/70 hover:text-white rounded-lg transition-all"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              <Icon name={mobileOpen ? 'XMarkIcon' : 'Bars3Icon'} size={22} />
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-primary border-t border-white/10 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS?.map(link => (
                <Link
                  key={link?.label}
                  href={link?.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                >
                  {link?.label}
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2 flex flex-col gap-1">
                <Link
                  href="/sign-up-login"
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2"
                >
                  <Icon name="UserIcon" size={18} />
                  Mi cuenta
                </Link>
                <button className="px-4 py-3 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all flex items-center gap-2 text-left">
                  <Icon name="HeartIcon" size={18} />
                  Favoritos
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
      {/* Spacer for fixed header */}
      <div className="h-[104px]" />
    </>
  );
}