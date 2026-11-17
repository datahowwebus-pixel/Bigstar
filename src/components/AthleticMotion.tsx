import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX, transformOrigin: '0% 50%' }}
      className="fixed top-20 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0A1628] via-[#C6A253] to-[#0A1628] z-40 pointer-events-none"
    />
  );
};

interface AthleticHeadingProps {
  eyebrow?: string;
  title: string;
  as?: 'h1' | 'h2' | 'h3';
  dark?: boolean;
  sportsFont?: boolean;
  className?: string;
}

const headingContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
    },
  },
};

const wordVariants = {
  hidden: {
    y: '105%',
    x: -8,
    skewX: -6,
    opacity: 0,
  },
  visible: {
    y: '0%',
    x: 0,
    skewX: 0,
    opacity: 1,
    transition: {
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export const AthleticHeading: React.FC<AthleticHeadingProps> = ({
  eyebrow,
  title,
  as = 'h2',
  dark = false,
  sportsFont = true,
  className = '',
}) => {
  const words = title.split(' ');
  const HeadingTag = motion[as];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 'some' }}
      className={className}
    >
      {eyebrow && (
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -14 },
            visible: {
              opacity: 1,
              x: 0,
              transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
            },
          }}
          className="flex items-center gap-3 mb-2.5"
        >
          <motion.span
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            style={{ transformOrigin: '0% 50%' }}
            className="inline-block w-8 h-[2px] bg-[#C6A253] shrink-0"
          />
          <p
            className={`font-sports text-xs md:text-sm font-bold uppercase tracking-[0.22em] ${
              dark ? 'text-[#E5C883]' : 'text-[#8C6D2E]'
            }`}
          >
            {eyebrow}
          </p>
        </motion.div>
      )}

      <HeadingTag
        variants={headingContainerVariants}
        className={`${
          sportsFont
            ? 'font-sports uppercase italic tracking-wide leading-[1.02]'
            : 'font-display tracking-tight leading-[1.08]'
        } font-bold text-balance ${
          dark ? 'text-white' : 'text-[#0A1628]'
        } text-3xl sm:text-4xl md:text-5xl`}
      >
        {words.map((word, idx) => (
          <span
            key={`${word}-${idx}`}
            className="inline-block overflow-hidden align-bottom mr-[0.24em] pb-1"
          >
            <motion.span variants={wordVariants} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </HeadingTag>

      <motion.div
        variants={{
          hidden: { scaleX: 0, opacity: 0 },
          visible: {
            scaleX: 1,
            opacity: 1,
            transition: { duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] },
          },
        }}
        style={{ transformOrigin: '0% 50%' }}
        className={`mt-2.5 h-[2px] w-20 ${
          dark
            ? 'bg-gradient-to-r from-[#C6A253] to-transparent'
            : 'bg-gradient-to-r from-[#0A1628] via-[#C6A253] to-transparent'
        }`}
      />
    </motion.div>
  );
};

interface AthleticTickerStripProps {
  variant?: 'navy' | 'light';
}

export const AthleticTickerStrip: React.FC<AthleticTickerStripProps> = ({
  variant = 'navy',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const xTop = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const xBottom = useTransform(scrollYProgress, [0, 1], ['-18%', '0%']);

  const isNavy = variant === 'navy';

  const rowOne = [
    'BIG STAR SPORTSWEAR',
    'TEAM & CLUB UNIFORMS',
    'FIGHTING & MARTIAL ARTS',
    'COMPRESSION & TRAINING',
    'MOTORCYCLE ARMOR',
    'GLOBAL OEM EXPORTS',
  ];

  const rowTwo = [
    'SUBLIMATION ENGINEERING',
    'MEDICAL & CLINICAL SCRUBS',
    'FULL-GRAIN LEATHERCRAFT',
    'HI-VIS SAFETY WORKWEAR',
    'CUSTOM PRIVATE LABEL',
    'ISO 9001 CERTIFIED',
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`overflow-hidden select-none border-b ${
        isNavy
          ? 'bg-[#0A1628] text-white border-white/10 py-5 md:py-6'
          : 'bg-[#ECEFF3] text-[#0A1628] border-[#0A1628]/10 py-5 md:py-6'
      }`}
    >
      <motion.div
        style={{ x: xTop }}
        className="flex items-center gap-8 whitespace-nowrap will-change-transform"
      >
        {[...rowOne, ...rowOne].map((item, i) => (
          <span
            key={`t1-${i}`}
            className="inline-flex items-center gap-8 font-sports italic font-extrabold uppercase text-2xl sm:text-3xl md:text-4xl tracking-wider"
          >
            <span className={i % 2 === 0 ? '' : isNavy ? 'text-[#C6A253]' : 'text-[#8C6D2E]'}>
              {item}
            </span>
            <span
              className={`w-2 h-2 rotate-45 ${
                isNavy ? 'bg-[#C6A253]' : 'bg-[#0A1628]/35'
              }`}
            />
          </span>
        ))}
      </motion.div>

      <motion.div
        style={{ x: xBottom }}
        className="flex items-center gap-8 whitespace-nowrap mt-2 will-change-transform"
      >
        {[...rowTwo, ...rowTwo].map((item, i) => (
          <span
            key={`t2-${i}`}
            className={`inline-flex items-center gap-8 font-sports font-bold uppercase text-sm sm:text-base md:text-lg tracking-[0.26em] ${
              isNavy ? 'text-white/65' : 'text-[#0A1628]/65'
            }`}
          >
            <span>{item}</span>
            <span className="text-[#C6A253]">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};
