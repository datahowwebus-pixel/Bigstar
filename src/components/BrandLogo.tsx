import React, { useState } from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'header' | 'footer';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = 'h-12 w-auto',
  variant = 'footer',
}) => {
  const [failed, setFailed] = useState(false);

  const src =
    variant === 'header'
      ? '/bigstarlogo.png'
      : '/bgflogo.png';

  if (failed) {
    return (
      <span
        className={`font-sports text-xl font-extrabold italic uppercase tracking-wider ${
          variant === 'header' ? 'text-[#0A1628]' : 'text-white'
        }`}
      >
        BIG <span className="text-[#C6A253]">STAR</span>
      </span>
    );
  }

  return (
    <img
      src={src}
      alt="Big Star Sportswear & Industries Logo"
      referrerPolicy="no-referrer"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onError={() => setFailed(true)}
      className={`${className} object-contain select-none pointer-events-none`}
    />
  );
};
