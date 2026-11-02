import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutContent from '@/app/checkout/components/CheckoutContent';

export const metadata = {
  title: 'Finalizar Compra | SURNOVA Honduras',
  description: 'Completa tu pedido en SURNOVA. Envíos a todo Honduras.',
};

export default function CheckoutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <CheckoutContent />
      </main>
      <Footer />
    </>
  );
}