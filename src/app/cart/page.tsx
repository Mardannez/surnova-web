import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import CartContent from '@/app/cart/components/CartContent';

export const metadata = {
  title: 'Carrito de Compras | SURNOVA Honduras',
  description: 'Revisa tu carrito de compras y finaliza tu pedido en SURNOVA.',
};

export default function CartPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <CartContent />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}