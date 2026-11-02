import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import Icon from '@/components/ui/AppIcon';

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Main row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <AppLogo size={32} />
            <div>
              <span className="font-extrabold text-lg text-white tracking-tight block">SURNOVA</span>
              <span className="text-xs text-white/40 tracking-wide">Tecnología que transforma.</span>
            </div>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-8 gap-y-2">
            <Link href="/catalog" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Catálogo</Link>
            <Link href="/catalog?filter=ofertas" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Ofertas</Link>
            <Link href="/catalog?category=gaming" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Gaming</Link>
            <Link href="/sign-up-login" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Mi cuenta</Link>
            <Link href="/cart" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Carrito</Link>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-3">
            <a href="#" aria-label="Facebook" className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-accent hover:border-accent transition-all">
              <Icon name="GlobeAltIcon" size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-accent hover:border-accent transition-all">
              <Icon name="CameraIcon" size={16} />
            </a>
            <a href="https://wa.me/50499999999" aria-label="WhatsApp" className="w-9 h-9 flex items-center justify-center rounded-full border border-white/15 text-white/50 hover:text-accent hover:border-accent transition-all">
              <Icon name="ChatBubbleLeftRightIcon" size={16} />
            </a>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35">
            © 2026 SURNOVA · Choluteca, Honduras. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-5">
            <a href="#" className="text-xs text-white/35 hover:text-white/60 transition-colors">Privacidad</a>
            <a href="#" className="text-xs text-white/35 hover:text-white/60 transition-colors">Términos</a>
          </div>
        </div>
      </div>
    </footer>
  );
}