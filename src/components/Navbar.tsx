import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, ChevronDown, X } from 'lucide-react';
import { DIVISIONS, DivisionId } from '../data/catalog';
import { BrandLogo } from './BrandLogo';

interface NavbarProps {
  onNavigateHome: () => void;
  onScrollToSection: (sectionId: string) => void;
  onSelectDivision: (divisionId: DivisionId) => void;
  onOpenAdmin: () => void;
  onOpenQuote: () => void;
  activeView: 'home' | 'division';
}

export const Navbar: React.FC<NavbarProps> = ({
  onNavigateHome,
  onScrollToSection,
  onSelectDivision,
  onOpenAdmin,
  onOpenQuote,
  activeView,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredDivId, setHoveredDivId] = useState<DivisionId>('sportswear');
  const headerRef = useRef<HTMLElement | null>(null);

  const activeDivision =
    DIVISIONS.find((d) => d.id === hoveredDivId) || DIVISIONS[0];

  useEffect(() => {
    if (!menuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    const handleClickOutside = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKey);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const handleNavClick = (sectionId: string) => {
    setMenuOpen(false);
    if (activeView !== 'home') {
      onNavigateHome();
      window.setTimeout(() => {
        onScrollToSection(sectionId);
      }, 60);
    } else {
      onScrollToSection(sectionId);
    }
  };

  const handlePickDivision = (id: DivisionId) => {
    setMenuOpen(false);
    onSelectDivision(id);
  };

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-sm border-b border-[#0A1628]/10"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Uploaded bigstarlogo.png + Sports-Typography Wordmark */}
        <button
          type="button"
          onClick={() => {
            setMenuOpen(false);
            onNavigateHome();
          }}
          className="flex items-center gap-3.5 text-left whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] rounded-sm py-1"
        >
          <BrandLogo
            variant="header"
            className="h-12 sm:h-14 md:h-[60px] w-auto shrink-0"
          />
          <span className="hidden sm:flex flex-col justify-center whitespace-nowrap shrink-0 border-l border-[#0A1628]/15 pl-3.5 py-0.5">
            <span className="font-sports text-xl md:text-2xl font-extrabold italic uppercase tracking-wider text-[#0A1628] leading-none">
              BIG STAR
            </span>
            <span className="font-sports text-[11px] md:text-xs font-bold uppercase tracking-[0.26em] text-[#8C6D2E] leading-none mt-1">
              INDUSTRIES
            </span>
          </span>
        </button>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-[#0A1628]/70"
        >
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            className={`inline-flex items-center gap-1 hover:text-[#0A1628] transition-colors whitespace-nowrap shrink-0 py-1 border-b focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] ${
              menuOpen
                ? 'text-[#0A1628] border-[#C6A253]'
                : 'border-transparent hover:border-[#C6A253]'
            }`}
          >
            <span>Products</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-200 ${
                menuOpen ? 'rotate-180 text-[#8C6D2E]' : ''
              }`}
            />
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('studio-3d')}
            className="hover:text-[#0A1628] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A253] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            3D Studio
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('samples')}
            className="hover:text-[#0A1628] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A253] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            Collection
          </button>

          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenAdmin();
            }}
            className="hover:text-[#0A1628] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A253] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            Admin
          </button>

          <button
            type="button"
            onClick={() => handleNavClick('contact')}
            className="hover:text-[#0A1628] transition-colors whitespace-nowrap shrink-0 py-1 border-b border-transparent hover:border-[#C6A253] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            Contact
          </button>
        </nav>

        {/* Mobile Products trigger + Zone 3: 1 Primary Navy CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden px-3 py-2 text-xs font-medium text-[#0A1628] border border-[#0A1628]/20 rounded-sm whitespace-nowrap shrink-0"
          >
            {menuOpen ? 'Close' : 'Products'}
          </button>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenQuote();
            }}
            className="px-4 py-2 text-xs md:text-sm font-medium bg-[#0A1628] text-white hover:bg-[#132642] transition-colors rounded-sm whitespace-nowrap shrink-0 border border-[#0A1628] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            Request Quote
          </button>
        </div>
      </div>

      {/* Text-Only Full Product Directory Mega-Menu (No Images) */}
      {menuOpen && (
        <div className="absolute left-0 right-0 top-20 bg-white text-[#0A1628] border-b border-[#0A1628]/15 shadow-lg z-50 max-h-[82vh] overflow-y-auto">
          <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-8">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#0A1628]/10">
              <p className="text-xs font-medium text-[#8C6D2E] tracking-wide">
                Bigstar Industries · Complete Product Directory (All 5 Divisions)
              </p>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="Close product directory menu"
                className="p-1 text-[#0A1628]/60 hover:text-[#0A1628] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: 5 Main Divisions List */}
              <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-[#0A1628]/10 pb-6 lg:pb-0 lg:pr-6 space-y-1.5">
                {DIVISIONS.map((div) => {
                  const isActive = div.id === activeDivision.id;
                  const itemCount = div.subcategories.reduce(
                    (acc, s) => acc + s.items.length,
                    0,
                  );
                  return (
                    <button
                      key={div.id}
                      type="button"
                      onMouseEnter={() => setHoveredDivId(div.id)}
                      onFocus={() => setHoveredDivId(div.id)}
                      onClick={() => handlePickDivision(div.id)}
                      className={`w-full text-left px-4 py-3 rounded-sm transition-colors flex items-center justify-between gap-3 border ${
                        isActive
                          ? 'bg-[#0A1628] text-white border-[#0A1628]'
                          : 'bg-transparent text-[#0A1628] border-transparent hover:bg-[#F7F8FA]'
                      }`}
                    >
                      <div className="min-w-0">
                        <span
                          className={`font-mono-tabular text-xs mr-2.5 ${
                            isActive ? 'text-[#C6A253]' : 'text-[#8C6D2E]'
                          }`}
                        >
                          {div.number}
                        </span>
                        <span className="font-display text-sm font-medium">
                          {div.title}
                        </span>
                      </div>
                      <span
                        className={`font-mono-tabular text-[11px] shrink-0 ${
                          isActive ? 'text-white/70' : 'text-[#0A1628]/45'
                        }`}
                      >
                        {itemCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Right Column: Complete Subcategories & Numbered Products List (No Images) */}
              <div className="lg:col-span-8">
                <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-5 border-b border-[#0A1628]/10">
                  <div>
                    <span className="font-mono-tabular text-xs text-[#8C6D2E] mr-2">
                      Division {activeDivision.number}
                    </span>
                    <h3 className="inline font-display text-lg font-medium text-[#0A1628]">
                      {activeDivision.title}
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={() => handlePickDivision(activeDivision.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-[#0A1628] hover:text-[#8C6D2E] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>Open Division Page</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-[#C6A253]" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {activeDivision.subcategories.map((sub) => (
                    <div key={sub.code} className="space-y-2.5">
                      <p className="font-display text-xs font-semibold text-[#0A1628] pb-1.5 border-b border-[#0A1628]/10">
                        <span className="font-mono-tabular text-[#C6A253] mr-1.5">
                          {sub.code}.
                        </span>
                        {sub.title}
                      </p>
                      <ul className="space-y-1 text-xs text-[#0A1628]/75">
                        {sub.items.map((item, idx) => (
                          <li key={item}>
                            <button
                              type="button"
                              onClick={() => handlePickDivision(activeDivision.id)}
                              className="text-left hover:text-[#0A1628] hover:underline underline-offset-2 decoration-[#C6A253] transition-colors flex items-baseline gap-2"
                            >
                              <span className="font-mono-tabular text-[10px] text-[#0A1628]/40 w-4 shrink-0">
                                {idx + 1}.
                              </span>
                              <span>{item}</span>
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
