import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ProductDetailContent from '@/app/product-detail/components/ProductDetailContent';

export const metadata = {
  title: 'Detalle de Producto | SURNOVA Honduras',
  description: 'Especificaciones, precio y disponibilidad. Compra tecnología de calidad en SURNOVA Honduras.',
};

export default function ProductDetailPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <ProductDetailContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}