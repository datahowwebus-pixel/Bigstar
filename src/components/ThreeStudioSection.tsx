import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { DivisionId } from '../data/catalog';
import { StudioImage } from './StudioImage';
import { AthleticHeading } from './AthleticMotion';

interface ShowcaseCardItem {
  id: string;
  divisionId: DivisionId;
  number: string;
  title: string;
  category: string;
  image: string;
}

const SHOWCASE_BOXES: ShowcaseCardItem[] = [
  {
    id: 'box-sportswear',
    divisionId: 'sportswear',
    number: '01',
    title: 'Performance Tracksuit & Kit',
    category: 'Sportswear & Team Apparel',
    image: '/src/assets/images/full_dummy_sportswear_1794899018416.jpg',
  },
  {
    id: 'box-motorcycle',
    divisionId: 'motorcycle',
    number: '02',
    title: 'Armored Leather Moto Suit',
    category: 'Motorcycle & Protective Wear',
    image: '/src/assets/images/full_dummy_motorcycle_1794899019912.jpg',
  },
  {
    id: 'box-medical',
    divisionId: 'medical',
    number: '03',
    title: 'Clinical Antimicrobial Scrubs',
    category: 'Medical & Healthcare Uniforms',
    image: '/src/assets/images/full_dummy_medical_1794899021265.jpg',
  },
  {
    id: 'box-leather',
    divisionId: 'fashion-leather',
    number: '04',
    title: 'Leather Jacket & Duffel Set',
    category: 'Fashion, Lifestyle & Leather',
    image: '/src/assets/images/full_dummy_leather_1794899021518.jpg',
  },
  {
    id: 'box-safety',
    divisionId: 'safety-workwear',
    number: '05',
    title: 'Hi-Vis FR Workwear Suit',
    category: 'Safety & Industrial Workwear',
    image: '/src/assets/images/full_dummy_safety_1794899023285.jpg',
  },
];

interface ThreeStudioSectionProps {
  onSelectDivision?: (divisionId: DivisionId) => void;
}

interface TiltBoxProps {
  item: ShowcaseCardItem;
  index: number;
  parallaxY: MotionValue<number>;
  onSelect?: (divisionId: DivisionId) => void;
}

const ThreeDShowcaseBox: React.FC<TiltBoxProps> = ({
  item,
  index,
  parallaxY,
  onSelect,
}) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, hover: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rx: -py * 8,
      ry: px * 10,
      hover: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0, hover: false });
  };

  return (
    <motion.div
      style={{ y: parallaxY, perspective: 1100 }}
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.65,
        delay: index * 0.08,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="will-change-transform"
    >
      <button
        type="button"
        onClick={() => onSelect?.(item.divisionId)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) translateZ(0)`,
          transition: tilt.hover
            ? 'transform 120ms ease-out'
            : 'transform 380ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        className="group w-full bg-white border border-[#0A1628]/15 hover:border-[#C6A253] text-left flex flex-col overflow-hidden shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6A253]"
      >
        {/* 2:3 Full-Body Portrait Mannequin Frame */}
        <div className="relative w-full aspect-[2/3] overflow-hidden bg-[#ECEFF3]">
          <motion.div
            animate={{ scale: tilt.hover ? 1.03 : 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <StudioImage
              src={item.image}
              alt={`${item.title} full-body mannequin showcase`}
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <span className="font-sports italic text-xs font-bold text-[#E5C883] bg-[#0A1628]/90 px-2.5 py-0.5 border border-[#C6A253]/40 tracking-wider">
              {item.number}
            </span>
          </div>
        </div>

        {/* Clean Navy & Gold Card Footer */}
        <div className="p-4 flex items-end justify-between gap-2.5 bg-[#0A1628] border-t border-[#C6A253]/25">
          <div className="min-w-0">
            <p className="text-[11px] text-[#E5C883] truncate mb-0.5">
              {item.category}
            </p>
            <h3 className="font-sports italic uppercase text-base lg:text-lg font-bold tracking-wide text-white truncate">
              {item.title}
            </h3>
          </div>
          <ArrowUpRight className="w-4 h-4 text-[#C6A253] shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </button>
    </motion.div>
  );
};

export const ThreeStudioSection: React.FC<ThreeStudioSectionProps> = ({
  onSelectDivision,
}) => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Counter-gliding scroll depth between odd and even showcase boxes
  const yEven = useTransform(scrollYProgress, [0, 1], [14, -14]);
  const yOdd = useTransform(scrollYProgress, [0, 1], [-14, 14]);

  return (
    <section
      ref={sectionRef}
      id="studio-3d"
      className="relative bg-[#071121] text-white border-b border-white/10 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <AthleticHeading
            eyebrow="3D Studio Showcase · Divisions 01–05"
            title="Full-Body Apparel Mannequins"
            dark
          />
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm text-white/70 max-w-md"
          >
            All five flagship divisions dressed head-to-toe on full-body studio mannequins against bright architectural backdrops. Hover for depth tilt or click any division.
          </motion.p>
        </div>

        {/* All 5 Separate Full-Body Mannequin Showcase Boxes (01 through 05) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 py-2">
          {SHOWCASE_BOXES.map((item, idx) => (
            <ThreeDShowcaseBox
              key={item.id}
              item={item}
              index={idx}
              parallaxY={idx % 2 === 0 ? yEven : yOdd}
              onSelect={onSelectDivision}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
