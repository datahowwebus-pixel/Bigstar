import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { DIVISIONS, DivisionId, SampleProduct } from '../data/catalog';
import { StudioImage } from './StudioImage';
import { AthleticHeading } from './AthleticMotion';

interface DivisionViewProps {
  divisionId: DivisionId;
  products: SampleProduct[];
  onBackHome: () => void;
  onSelectDivision: (id: DivisionId) => void;
  onSelectProduct: (product: SampleProduct) => void;
  onRequestDivisionQuote: (divisionId: DivisionId) => void;
}

export const DivisionView: React.FC<DivisionViewProps> = ({
  divisionId,
  products,
  onBackHome,
  onSelectDivision,
  onSelectProduct,
  onRequestDivisionQuote,
}) => {
  const division = DIVISIONS.find((d) => d.id === divisionId) || DIVISIONS[0];
  const divisionProducts = products.filter((p) => p.divisionId === division.id);

  return (
    <div className="bg-[#F7F8FA] min-h-screen">
      {/* Division Navigation Bar */}
      <div className="bg-white border-b border-[#0A1628]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-4 flex flex-wrap items-center justify-between gap-4">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#0A1628] hover:text-[#8C6D2E] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {DIVISIONS.map((div) => {
              const active = div.id === division.id;
              return (
                <button
                  key={div.id}
                  type="button"
                  onClick={() => onSelectDivision(div.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors whitespace-nowrap shrink-0 border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253] ${
                    active
                      ? 'bg-[#0A1628] text-white border-[#0A1628]'
                      : 'bg-[#F7F8FA] text-[#0A1628]/70 border-[#0A1628]/10 hover:text-[#0A1628]'
                  }`}
                >
                  <span
                    className={`font-mono-tabular mr-1.5 ${
                      active ? 'text-[#E5C883]' : 'text-[#8C6D2E]'
                    }`}
                  >
                    {div.number}
                  </span>
                  <span>{div.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Division Hero Split */}
      <section className="bg-white border-b border-[#0A1628]/10 py-14 md:py-20">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <AthleticHeading
                as="h1"
                eyebrow={`Division ${division.number} · ${division.accentSpec}`}
                title={division.title}
                className="mb-5"
              />
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.15 }}
                className="font-serif-editorial italic text-xl md:text-2xl text-[#0A1628]/80 mb-6"
              >
                {division.tagline}
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 }}
                className="text-sm md:text-base text-[#0A1628]/70 leading-relaxed max-w-xl"
              >
                {division.editorialNote}
              </motion.p>
            </div>

            <div className="pt-8 mt-8 border-t border-[#0A1628]/10 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => onRequestDivisionQuote(division.id)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A1628] text-white text-sm font-medium rounded-sm hover:bg-[#132642] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
              >
                <span>Request Division RFQ</span>
                <ArrowUpRight className="w-4 h-4 text-[#C6A253]" />
              </button>
              <span className="inline-flex items-center gap-1.5 text-xs text-[#0A1628]/65">
                <ShieldCheck className="w-4 h-4 text-[#C6A253]" />
                <span>Private Label, OEM & Custom Manufacturing Available</span>
              </span>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="w-full h-full min-h-[320px] aspect-[4/3] overflow-hidden bg-[#ECEFF3] border border-[#0A1628]/10">
              <StudioImage
                src={division.heroImage}
                alt={`${division.title} branded apparel lookbook`}
                className="w-full h-full object-cover object-[50%_18%]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complete Subcategory Directory */}
      <section className="py-16 md:py-24 border-b border-[#0A1628]/10 bg-[#F7F8FA]">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="mb-12">
            <AthleticHeading
              eyebrow="Complete Manufacturing Scope"
              title="Subcategories & Product Lines"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {division.subcategories.map((group, idx) => (
              <motion.div
                key={group.code}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.5,
                  delay: (idx % 2) * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="bg-white border border-[#0A1628]/10 p-6 md:p-8"
              >
                <div className="flex items-baseline justify-between gap-4 pb-4 mb-5 border-b border-[#0A1628]/10">
                  <h3 className="font-sports italic uppercase text-xl md:text-2xl font-bold tracking-wide text-[#0A1628]">
                    <span className="font-mono-tabular text-[#8C6D2E] mr-2.5 not-italic">
                      {group.code}.
                    </span>
                    {group.title}
                  </h3>
                  <span className="font-mono-tabular text-xs text-[#0A1628]/50 shrink-0">
                    {group.items.length} lines
                  </span>
                </div>

                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 text-sm text-[#0A1628]/80">
                  {group.items.map((item, itemIdx) => (
                    <li key={item} className="flex items-baseline gap-2.5">
                      <span className="font-mono-tabular text-xs text-[#8C6D2E] w-5 shrink-0">
                        {String(itemIdx + 1).padStart(2, '0')}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sample Products for this Division */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <AthleticHeading
              eyebrow={`Division ${division.number} Specimens`}
              title="Sample Product Gallery"
            />
            <p className="text-sm text-[#0A1628]/60">
              Click any specimen for sizing, material breakdown, and RFQ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {divisionProducts.map((product, idx) => (
              <motion.button
                key={product.id}
                type="button"
                onClick={() => onSelectProduct(product)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: 0.48,
                  delay: (idx % 4) * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group bg-white border border-[#0A1628]/12 text-left flex flex-col overflow-hidden hover:border-[#C6A253] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#ECEFF3]">
                  <StudioImage
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover object-[50%_15%] transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-2.5 left-2.5 font-mono-tabular text-[11px] font-medium text-[#E5C883] bg-[#0A1628]/90 px-2 py-0.5 border border-[#C6A253]/35">
                    {product.code}
                  </span>
                </div>
                <div className="px-4 py-3.5 bg-[#0A1628] text-white flex items-center justify-between gap-2 border-t border-[#C6A253]/25">
                  <h3 className="font-sports italic uppercase text-base font-bold tracking-wide text-white truncate">
                    {product.name}
                  </h3>
                  <ArrowUpRight className="w-4 h-4 text-[#C6A253] shrink-0" />
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
