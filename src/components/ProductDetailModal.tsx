import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Check, X } from 'lucide-react';
import { DIVISIONS, SampleProduct } from '../data/catalog';
import { StudioImage } from './StudioImage';

interface ProductDetailModalProps {
  product: SampleProduct | null;
  onClose: () => void;
  onRequestQuote: (product: SampleProduct, selectedOptions: string[]) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onRequestQuote,
}) => {
  const [activeFrameIdx, setActiveFrameIdx] = useState(0);
  const [selectedCustom, setSelectedCustom] = useState<string[]>([]);

  useEffect(() => {
    setActiveFrameIdx(0);
    setSelectedCustom(product ? [product.customization[0]] : []);
  }, [product]);

  useEffect(() => {
    if (!product) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const division = DIVISIONS.find((d) => d.id === product.divisionId);
  const currentView = product.galleryViews[activeFrameIdx] || product.galleryViews[0];

  const toggleCustom = (opt: string) => {
    setSelectedCustom((prev) =>
      prev.includes(opt) ? prev.filter((item) => item !== opt) : [...prev, opt],
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#071121]/75 flex items-center justify-center p-4 md:p-8 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-white border border-[#0A1628]/15 overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#0A1628]/10 bg-[#0A1628] text-white">
          <div className="flex items-center gap-2 text-xs text-white/75">
            <span className="font-mono-tabular text-[#E5C883] font-medium">
              {product.code}
            </span>
            <span aria-hidden="true">·</span>
            <span>
              Division {division?.number}: {division?.shortTitle}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product specification"
            className="p-2 text-white/75 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Interactive Studio Image Gallery */}
          <div className="lg:col-span-6 bg-[#F7F8FA] p-6 flex flex-col justify-between gap-4 border-b lg:border-b-0 lg:border-r border-[#0A1628]/10">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-white border border-[#0A1628]/10">
              <StudioImage
                src={currentView?.image || product.image}
                alt={`${product.name} — ${currentView?.label || 'Studio view'}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-out"
                style={{
                  objectPosition: currentView?.cropPosition || 'center center',
                  transform: `scale(${currentView?.scale || 1})`,
                }}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-[#0A1628]/65">{currentView?.caption}</p>
              <div className="flex items-center gap-2 shrink-0">
                {product.galleryViews.map((view, idx) => (
                  <button
                    key={view.label}
                    type="button"
                    onClick={() => setActiveFrameIdx(idx)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] ${
                      idx === activeFrameIdx
                        ? 'bg-[#0A1628] text-white border-[#0A1628]'
                        : 'bg-white text-[#0A1628]/70 border-[#0A1628]/15 hover:text-[#0A1628]'
                    }`}
                  >
                    {view.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Technical Spec & RFQ */}
          <div className="lg:col-span-6 p-6 md:p-8 flex flex-col justify-between gap-6">
            <div>
              <p className="text-xs text-[#8C6D2E] font-medium mb-1">
                {product.subcategory}
              </p>
              <h2
                id="product-modal-title"
                className="font-display text-2xl md:text-3xl font-medium tracking-tight text-[#0A1628] mb-3"
              >
                {product.name}
              </h2>
              <p className="text-sm text-[#0A1628]/70 leading-relaxed mb-6">
                {product.summary}
              </p>

              {/* Tabular Specification Rows */}
              <div className="border-t border-[#0A1628]/10 divide-y divide-[#0A1628]/10 text-sm">
                <div className="py-3 grid grid-cols-3 gap-4">
                  <span className="text-[#0A1628]/55">Available Sizes</span>
                  <span className="col-span-2 font-mono-tabular text-xs md:text-sm text-[#0A1628]">
                    {product.sizes.join(' · ')}
                  </span>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <span className="text-[#0A1628]/55">Fabrics / Materials</span>
                  <span className="col-span-2 text-[#0A1628]">
                    {product.materials.join(', ')}
                  </span>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <span className="text-[#0A1628]/55">Spec / Weight</span>
                  <span className="col-span-2 font-mono-tabular text-[#0A1628]">
                    {product.specWeight}
                  </span>
                </div>
                <div className="py-3 grid grid-cols-3 gap-4">
                  <span className="text-[#0A1628]/55">Export MOQ</span>
                  <span className="col-span-2 font-mono-tabular text-[#0A1628]">
                    {product.moq}
                  </span>
                </div>
              </div>

              {/* OEM / Private Label Options */}
              <div className="mt-6">
                <p className="text-xs font-medium text-[#0A1628]/60 mb-2.5">
                  OEM & Private Label Options (select for RFQ)
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.customization.map((opt) => {
                    const checked = selectedCustom.includes(opt);
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => toggleCustom(opt)}
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm border transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] ${
                          checked
                            ? 'bg-[#0A1628] text-white border-[#0A1628]'
                            : 'bg-[#F7F8FA] text-[#0A1628]/75 border-[#0A1628]/15 hover:border-[#0A1628]/35'
                        }`}
                      >
                        {checked && <Check className="w-3.5 h-3.5 text-[#E5C883]" />}
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[#0A1628]/10 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-[#0A1628]/60">
                {product.oemAvailable
                  ? 'OEM & Private Label Production Supported'
                  : 'Standard Export Specification'}
              </span>
              <button
                type="button"
                onClick={() => onRequestQuote(product, selectedCustom)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1628] text-white text-sm font-medium rounded-sm hover:bg-[#132642] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
              >
                <span>Request a Quotation (RFQ)</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A253]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
