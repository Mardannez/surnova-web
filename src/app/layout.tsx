import React from 'react';
import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '../styles/tailwind.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: 'SURNOVA — Tecnología que transforma | Honduras',
  description: 'Compra laptops, computadoras, gaming y componentes en SURNOVA. La tienda tecnológica moderna de Honduras con cobertura nacional. Laptops Honduras, Gaming Honduras.',
  keywords: 'laptops Honduras, computadoras Honduras, gaming Honduras, componentes PC Honduras, laptops Choluteca, computadoras Choluteca, SURNOVA',
  openGraph: {
    title: 'SURNOVA — Tecnología que transforma',
    description: 'Laptops, computadoras, gaming y componentes. Tienda tecnológica con cobertura nacional en Honduras.',
    images: [{ url: '/assets/images/app_logo.png', width: 1200, height: 630 }],
    locale: 'es_HN',
    type: 'website',
  },
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        {children}
</body>
    </html>
  );
}