import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CatalogContent from '@/app/catalog/components/CatalogContent';

export const metadata = {
  title: 'Catálogo de Productos | SURNOVA Honduras',
  description: 'Laptops, computadoras, gaming y más. Filtra por categoría, marca y precio. Envíos a todo Honduras.',
};

export default function CatalogPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <CatalogContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}