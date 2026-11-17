import React, { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import {
  DivisionId,
  INITIAL_SAMPLE_PRODUCTS,
  SampleProduct,
} from './data/catalog';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ThreeStudioSection } from './components/ThreeStudioSection';
import { DivisionPortfolioSections } from './components/DivisionPortfolioSections';
import { ProductGallerySection } from './components/ProductGallerySection';
import { DivisionView } from './components/DivisionView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AdminCatalogModal } from './components/AdminCatalogModal';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { AthleticTickerStrip, ScrollProgressBar } from './components/AthleticMotion';
import { ContentProtectionGuard } from './components/ContentProtectionGuard';

const STORAGE_KEY = 'bigstar_industries_sample_catalog_v4';

export default function App() {
  const [products, setProducts] = useState<SampleProduct[]>(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore storage read errors
    }
    return INITIAL_SAMPLE_PRODUCTS;
  });

  const [activeDivisionId, setActiveDivisionId] = useState<DivisionId | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<SampleProduct | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<{
    divisionId?: DivisionId;
    productName?: string;
    options?: string[];
  } | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Ignore storage quota errors
    }
  }, [products]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectDivision = (id: DivisionId) => {
    setActiveDivisionId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setActiveDivisionId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRequestProductQuote = (product: SampleProduct, options: string[]) => {
    setSelectedProduct(null);
    setContactPrefill({
      divisionId: product.divisionId,
      productName: `${product.code} — ${product.name}`,
      options,
    });
    if (activeDivisionId) {
      setActiveDivisionId(null);
      window.setTimeout(() => scrollToSection('contact'), 80);
    } else {
      scrollToSection('contact');
    }
  };

  const handleRequestDivisionQuote = (divisionId: DivisionId) => {
    setContactPrefill({ divisionId });
    setActiveDivisionId(null);
    window.setTimeout(() => scrollToSection('contact'), 80);
  };

  const handleOpenGlobalQuote = () => {
    if (activeDivisionId) {
      setActiveDivisionId(null);
      window.setTimeout(() => scrollToSection('contact'), 80);
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#F7F8FA] text-[#0A1628]">
        <ContentProtectionGuard />
        <ScrollProgressBar />
        <Navbar
          activeView={activeDivisionId ? 'division' : 'home'}
          onNavigateHome={handleNavigateHome}
          onScrollToSection={scrollToSection}
          onSelectDivision={handleSelectDivision}
          onOpenAdmin={() => setAdminOpen(true)}
          onOpenQuote={handleOpenGlobalQuote}
        />

        <main className="flex-1 overflow-x-clip">
          {activeDivisionId ? (
            <DivisionView
              divisionId={activeDivisionId}
              products={products}
              onBackHome={handleNavigateHome}
              onSelectDivision={handleSelectDivision}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onRequestDivisionQuote={handleRequestDivisionQuote}
            />
          ) : (
            <>
              <HeroSection
                onExploreDivisions={() => scrollToSection('divisions')}
                onOpenStudio3D={() => scrollToSection('studio-3d')}
              />
              <AthleticTickerStrip variant="navy" />
              <ThreeStudioSection onSelectDivision={handleSelectDivision} />
              <DivisionPortfolioSections onSelectDivision={handleSelectDivision} />
              <AthleticTickerStrip variant="light" />
              <ProductGallerySection
                products={products}
                onSelectProduct={(p) => setSelectedProduct(p)}
              />
              <ContactSection prefill={contactPrefill} />
            </>
          )}
        </main>

        <Footer
          onSelectDivision={handleSelectDivision}
          onNavigateHome={handleNavigateHome}
        />

      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onRequestQuote={handleRequestProductQuote}
      />

      <AdminCatalogModal
        isOpen={adminOpen}
        products={products}
        onClose={() => setAdminOpen(false)}
        onAddProduct={(prod) => setProducts((prev) => [prod, ...prev])}
        onDeleteProduct={(id) =>
          setProducts((prev) => prev.filter((item) => item.id !== id))
        }
        onResetDefaults={() => setProducts(INITIAL_SAMPLE_PRODUCTS)}
      />
      </div>
    </MotionConfig>
  );
}
