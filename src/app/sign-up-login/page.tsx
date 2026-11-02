import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AuthContent from '@/app/sign-up-login/components/AuthContent';

export const metadata = {
  title: 'Mi Cuenta | SURNOVA Honduras',
  description: 'Inicia sesión o crea tu cuenta en SURNOVA para gestionar pedidos y favoritos.',
};

export default function SignUpLoginPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <AuthContent />
      </main>
      <Footer />
    </>
  );
}