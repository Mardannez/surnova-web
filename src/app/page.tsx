import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HeroSection from '@/app/components/HeroSection';
import CategoriesSection from '@/app/components/CategoriesSection';
import FeaturedProductsSection from '@/app/components/FeaturedProductsSection';
import OffersSection from '@/app/components/OffersSection';
import GamingSection from '@/app/components/GamingSection';
import BusinessSection from '@/app/components/BusinessSection';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <OffersSection />
        <GamingSection />
        <BusinessSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}