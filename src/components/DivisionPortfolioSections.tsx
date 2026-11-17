import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DIVISIONS, DivisionId, DivisionInfo } from '../data/catalog';
import { StudioImage } from './StudioImage';
import { AthleticHeading } from './AthleticMotion';

interface DivisionPortfolioSectionsProps {
  onSelectDivision: (divisionId: DivisionId) => void;
}

interface DivisionChapterRowProps {
  division: DivisionInfo;
  index: number;
  onSelectDivision: (divisionId: DivisionId) => void;
}

const DivisionChapterRow: React.FC<DivisionChapterRowProps> = ({
  division,
  index,
  onSelectDivision,
}) => {
  const rowRef = useRef<HTMLElement | null>(null);
  const [cycle, setCycle] = useState(0);
  const [paused, setPaused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ['start end', 'end start'],
  });

  const numberX = useTransform(scrollYProgress, [0, 0.5, 1], [-14, 0, 8]);

  const isReversed = index % 2 === 1;
  const totalItems = division.subcategories.reduce(
    (sum, sub) => sum + sub.items.length,
    0,
  );

  // Smoothly rotate the 3 collage images through spotlight and secondary slots
  useEffect(() => {
    if (paused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setCycle((prev) => (prev + 1) % 3);
    }, 3200 + index * 350);

    return () => window.clearInterval(timer);
  }, [paused, index]);

  const collage = division.collageImages;

  return (
    <article
      ref={rowRef}
      className="py-16 md:py-24 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch"
    >
      {/* Dynamic 3-Image Rotating Product Collage Box */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        className={`lg:col-span-7 ${isReversed ? 'lg:order-2' : 'lg:order-1'}`}
      >
        <div className="bg-[#ECEFF3] border border-[#0A1628]/12 hover:border-[#C6A253] transition-colors overflow-hidden flex flex-col h-full">
          {/* 3-Slot Animated Layout-Morphing Collage */}
          <button
            type="button"
            onClick={() => onSelectDivision(division.id)}
            aria-label={`Open ${division.title} division page`}
            className="group relative grid grid-cols-12 grid-rows-2 gap-2.5 p-2.5 w-full h-[380px] sm:h-[440px] lg:h-[470px] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            {collage.map((img, imgIdx) => {
              const slot = (imgIdx + cycle) % 3;
              const slotClass =
                slot === 0
                  ? 'col-span-7 row-span-2'
                  : slot === 1
                    ? 'col-span-5 row-span-1 col-start-8 row-start-1'
                    : 'col-span-5 row-span-1 col-start-8 row-start-2';

              return (
                <motion.div
                  key={img.src}
                  layout
                  transition={{
                    layout: { duration: 0.78, ease: [0.16, 1, 0.3, 1] },
                  }}
                  className={`${slotClass} relative overflow-hidden bg-white border ${
                    slot === 0 ? 'border-[#0A1628]/15' : 'border-[#0A1628]/10'
                  }`}
                >
                  <StudioImage
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    style={{ objectPosition: img.objectPosition || '50% 20%' }}
                  />
                </motion.div>
              );
            })}
          </button>

          {/* Clean Unobstructed Division Spec & Action Footer Strip */}
          <div className="px-4 py-3.5 bg-[#0A1628] text-white flex items-center justify-between gap-4 border-t border-[#C6A253]/25">
            <span className="font-mono-tabular text-xs text-white/85 truncate">
              {division.accentSpec}
            </span>
            <button
              type="button"
              onClick={() => onSelectDivision(division.id)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-[#E5C883] hover:text-white transition-colors whitespace-nowrap shrink-0"
            >
              <span>Open Division</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Editorial & Sports-Animated Copy Column */}
      <div
        className={`lg:col-span-5 flex flex-col justify-between py-2 ${
          isReversed ? 'lg:order-1' : 'lg:order-2'
        }`}
      >
        <div>
          <div className="flex items-baseline justify-between gap-4 mb-5">
            <motion.span
              style={{ x: numberX }}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block font-sports italic text-5xl md:text-6xl font-extrabold text-[#C6A253] leading-none"
            >
              {division.number}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: 14 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: 0.1 }}
              className="font-mono-tabular text-xs text-[#0A1628]/55"
            >
              {division.subcategories.length} Categories · {totalItems} Product Lines
            </motion.span>
          </div>

          <AthleticHeading
            as="h3"
            title={division.title}
            className="mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif-editorial italic text-xl text-[#0A1628]/80 leading-snug mb-8"
          >
            {division.tagline}
          </motion.p>

          {/* Staggered Unboxed Subcategory List */}
          <div className="border-t border-[#0A1628]/10 pt-5 space-y-3">
            {division.subcategories.map((sub, subIdx) => (
              <motion.div
                key={sub.code}
                initial={{ opacity: 0, x: 18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 'some' }}
                transition={{
                  duration: 0.42,
                  delay: 0.08 + subIdx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="flex items-baseline justify-between gap-4 text-sm"
              >
                <span className="text-[#0A1628] font-medium">
                  <span className="font-mono-tabular text-[#8C6D2E] mr-2.5">
                    {sub.code}.
                  </span>
                  {sub.title}
                </span>
                <span className="font-mono-tabular text-xs text-[#0A1628]/50 shrink-0">
                  {sub.items.length} items
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
          className="pt-8 mt-8 border-t border-[#0A1628]/10 flex items-center justify-between gap-4"
        >
          <button
            type="button"
            onClick={() => onSelectDivision(division.id)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#0A1628] text-white text-sm font-medium rounded-sm hover:bg-[#132642] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
          >
            <span>View Division {division.number}</span>
            <ArrowUpRight className="w-4 h-4 text-[#C6A253]" />
          </button>

          <span className="text-xs text-[#0A1628]/55 hidden sm:inline">
            OEM & Private Label Ready
          </span>
        </motion.div>
      </div>
    </article>
  );
};

export const DivisionPortfolioSections: React.FC<DivisionPortfolioSectionsProps> = ({
  onSelectDivision,
}) => {
  return (
    <section id="divisions" className="bg-white py-20 md:py-28 border-b border-[#0A1628]/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-14 border-b border-[#0A1628]/10">
          <AthleticHeading
            eyebrow="Five Export Divisions"
            title="Specialized Manufacturing Chapters"
          />
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm md:text-base text-[#0A1628]/65 max-w-md"
          >
            Select any division to view its complete subcategory index, material specifications, and studio product samples.
          </motion.p>
        </div>

        {/* Five Kinetic Sports Chapters */}
        <div className="divide-y divide-[#0A1628]/10">
          {DIVISIONS.map((division, idx) => (
            <DivisionChapterRow
              key={division.id}
              division={division}
              index={idx}
              onSelectDivision={onSelectDivision}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
