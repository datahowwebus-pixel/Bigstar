import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { StudioImage } from './StudioImage';

interface HeroSlide {
  id: string;
  label: string;
  image: string;
  alt: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 'slide-1',
    label: 'Move Better, Live Bolder — Bigstar Sportswear',
    image: '/bgh1.png',
    alt: 'Bigstar Sportswear Move Better Live Bolder athletic tracksuit campaign banner',
  },
  {
    id: 'slide-2',
    label: 'Play Bold — Wear Big Star',
    image: '/bgh2.png',
    alt: 'Bigstar Sportswear Play Bold Wear Big Star mens tracksuit banner',
  },
  {
    id: 'slide-3',
    label: 'Fitness In Every Move — Bigstar Sportswear',
    image: '/bgh3.png',
    alt: 'Bigstar Sportswear Fitness In Every Move training apparel banner',
  },
];

const HERO_METRICS = [
  { value: '05', label: 'Export Divisions' },
  { value: '170+', label: 'Product Lines' },
  { value: 'ISO 9001', label: 'CE & EN Quality Standards' },
  { value: '38+', label: 'Global Export Markets' },
];

interface HeroSectionProps {
  onExploreDivisions: () => void;
  onOpenStudio3D: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDivisions,
  onOpenStudio3D,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const bannerY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const bannerScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  useEffect(() => {
    if (paused) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

  const activeSlide = HERO_SLIDES[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#EAEEF3] border-b border-[#0A1628]/10 overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Bigstar Industries Featured Highlights"
    >
      <h1 className="sr-only">Bigstar Industries — Manufacturing &amp; Global Exports</h1>

      {/* Full-Width 3-Slide Hero Banner with subtle scroll-linked parallax */}
      <div className="relative w-full aspect-[1885/835] bg-[#DDE3EB] overflow-hidden">
        <motion.div
          style={{ y: bannerY, scale: bannerScale }}
          className="w-full h-full will-change-transform"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <StudioImage
                src={activeSlide.image}
                alt={activeSlide.alt}
                className="w-full h-full object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Left / Right Slide Controls */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous hero slide"
          className="absolute left-2.5 sm:left-4 md:left-7 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/85 hover:bg-white text-[#0A1628] border border-[#0A1628]/15 shadow-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
        >
          <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next hero slide"
          className="absolute right-2.5 sm:right-4 md:right-7 top-1/2 -translate-y-1/2 z-20 w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/85 hover:bg-white text-[#0A1628] border border-[#0A1628]/15 shadow-sm transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
        >
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
        </button>

        {/* Bottom Minimal Slide Indicators */}
        <div className="absolute bottom-2.5 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-white/75 backdrop-blur-xs px-3 py-1 rounded-sm border border-[#0A1628]/10">
          {HERO_SLIDES.map((slide, idx) => {
            const active = idx === activeIndex;
            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Show slide ${idx + 1}: ${slide.label}`}
                aria-current={active ? 'true' : undefined}
                className="group py-1 px-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
              >
                <span
                  className={`block h-[2.5px] transition-all duration-300 ${
                    active
                      ? 'w-8 md:w-10 bg-[#0A1628]'
                      : 'w-4 md:w-5 bg-[#0A1628]/30 group-hover:bg-[#0A1628]/60'
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* Full-Width Export Credentials & Quick Actions Strip */}
      <div className="bg-[#F7F8FA] border-t border-[#0A1628]/10">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 lg:gap-12 flex-1">
            {HERO_METRICS.map((metric, idx) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.45,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <p className="font-sports italic text-2xl md:text-3xl font-extrabold text-[#0A1628] tracking-wide">
                  {metric.value}
                </p>
                <p className="text-xs text-[#0A1628]/65 mt-0.5">{metric.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 shrink-0"
          >
            <button
              type="button"
              onClick={onExploreDivisions}
              className="px-5 py-2.5 bg-[#0A1628] text-white text-xs font-medium tracking-wide hover:bg-[#132642] transition-colors rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
            >
              Explore Divisions
            </button>
            <button
              type="button"
              onClick={onOpenStudio3D}
              className="px-4 py-2.5 bg-white text-[#0A1628] text-xs font-medium tracking-wide border border-[#0A1628]/20 hover:border-[#C6A253] transition-colors rounded-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
            >
              3D Showcase
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
