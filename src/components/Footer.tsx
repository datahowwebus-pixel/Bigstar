import React from 'react';
import { DIVISIONS, DivisionId } from '../data/catalog';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectDivision: (id: DivisionId) => void;
  onNavigateHome: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectDivision,
  onNavigateHome,
}) => {
  return (
    <footer className="bg-[#0A1628] text-white border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-5 space-y-4">
          <button
            type="button"
            onClick={onNavigateHome}
            className="inline-flex items-center gap-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] rounded-sm"
          >
            <BrandLogo
              variant="footer"
              className="h-20 sm:h-24 w-auto drop-shadow-[0_4px_14px_rgba(255,255,255,0.1)]"
            />
          </button>
          <p className="text-sm text-white/65 max-w-sm leading-relaxed">
            Bigstar Industries — Manufacturing & Global Exports. Precision sportswear, protective gear, clinical uniforms, leathercraft, and industrial workwear.
          </p>
        </div>

        <div className="md:col-span-4 space-y-3">
          <p className="text-xs font-medium text-[#C6A253]">Export Divisions</p>
          <ul className="space-y-2 text-sm text-white/75">
            {DIVISIONS.map((div) => (
              <li key={div.id}>
                <button
                  type="button"
                  onClick={() => onSelectDivision(div.id)}
                  className="hover:text-white transition-colors text-left"
                >
                  <span className="font-mono-tabular text-[#C6A253] mr-2">{div.number}</span>
                  <span>{div.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3 space-y-3 text-sm text-white/70">
          <p className="text-xs font-medium text-[#C6A253]">Global Trade</p>
          <p>OEM & Private Label Programs</p>
          <p>ISO 9001 · CE EN 17092 · EN ISO 20471</p>
          <p className="text-white/90">exports@bigstarindustries.com</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50">
          <span>© {new Date().getFullYear()} Bigstar Industries. All rights reserved.</span>
          <span>Manufacturing & Global Exports Portfolio</span>
        </div>
      </div>
    </footer>
  );
};
