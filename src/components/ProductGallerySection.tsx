import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DIVISIONS, DivisionId, SampleProduct } from '../data/catalog';
import { StudioImage } from './StudioImage';
import { AthleticHeading } from './AthleticMotion';

interface ProductGallerySectionProps {
  products: SampleProduct[];
  onSelectProduct: (product: SampleProduct) => void;
}

export const ProductGallerySection: React.FC<ProductGallerySectionProps> = ({
  products,
  onSelectProduct,
}) => {
  const [filter, setFilter] = useState<'all' | DivisionId>('all');

  const filteredProducts =
    filter === 'all' ? products : products.filter((p) => p.divisionId === filter);

  return (
    <section id="samples" className="bg-[#F7F8FA] py-20 md:py-28 border-b border-[#0A1628]/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Clean Visual-First Header + Wrapped Filter Controls (Zero Scrollbar) */}
        <div className="flex flex-col gap-6 mb-12">
          <AthleticHeading
            eyebrow="Studio Sample Collection"
            title="Product Lookbook Gallery"
          />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            role="tablist"
            aria-label="Filter sample products by division"
            className="flex flex-wrap items-center gap-2"
          >
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              onClick={() => setFilter('all')}
              className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] ${
                filter === 'all'
                  ? 'bg-[#0A1628] text-white border-[#0A1628]'
                  : 'bg-white text-[#0A1628]/70 border-[#0A1628]/15 hover:text-[#0A1628]'
              }`}
            >
              All ({products.length})
            </button>
            {DIVISIONS.map((div) => (
              <button
                key={div.id}
                type="button"
                role="tab"
                aria-selected={filter === div.id}
                onClick={() => setFilter(div.id)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] ${
                  filter === div.id
                    ? 'bg-[#0A1628] text-white border-[#0A1628]'
                    : 'bg-white text-[#0A1628]/70 border-[#0A1628]/15 hover:text-[#0A1628]'
                }`}
              >
                <span className="font-mono-tabular mr-1.5 text-[#C6A253]">{div.number}</span>
                <span>{div.shortTitle}</span>
              </button>
            ))}
          </motion.div>
        </div>

        {/* Visual-First 5-Column Studio Grid (Minimal Text, Maximum Product Visibility) */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white border border-[#0A1628]/10 p-12 text-center">
            <p className="font-display text-lg text-[#0A1628]">
              No sample products currently listed in this division.
            </p>
            <p className="text-sm text-[#0A1628]/60 mt-1">
              Add specimens anytime from the Admin Catalog panel.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {filteredProducts.map((product, idx) => (
              <motion.button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product)}
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: 0.48,
                  delay: (idx % 5) * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                className="group bg-white border border-[#0A1628]/12 text-left flex flex-col overflow-hidden transition-colors hover:border-[#C6A253] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden bg-[#ECEFF3]">
                  <StudioImage
                    src={product.image}
                    alt={`${product.name} Big Star studio showcase`}
                    className="w-full h-full object-cover object-[50%_15%] transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-2.5 left-2.5 font-mono-tabular text-[11px] font-medium text-[#E5C883] bg-[#0A1628]/90 px-2 py-0.5 border border-[#C6A253]/35">
                    {product.code}
                  </span>
                </div>

                <div className="px-4 py-3.5 bg-[#0A1628] text-white flex items-center justify-between gap-2 border-t border-[#C6A253]/25">
                  <h3 className="font-sports italic uppercase text-sm md:text-base font-bold tracking-wide text-white truncate">
                    {product.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#C6A253] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
