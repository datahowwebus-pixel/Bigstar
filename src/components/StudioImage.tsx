import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface StudioImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export const StudioImage: React.FC<StudioImageProps> = ({
  src,
  alt,
  className = '',
  style,
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#0A1628] via-[#132642] to-[#1D3557] text-white/80 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Layers className="w-8 h-8 text-[#C6A253] mb-3" strokeWidth={1.5} />
        <p className="font-display text-sm font-medium tracking-tight text-white/90 max-w-xs">
          {alt}
        </p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      draggable={false}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
      onError={() => setFailed(true)}
      className={`${className} select-none pointer-events-none`}
      style={style}
      loading="lazy"
    />
  );
};
