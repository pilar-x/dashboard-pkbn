import React from "react";

interface KartikaEkaPaksiLogoProps {
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Official Kartika Eka Paksi Logo Component (TNI AD)
 * Uses the official emblem vector asset for 100% authentic rendering
 */
export const KartikaEkaPaksiLogo: React.FC<KartikaEkaPaksiLogoProps> = ({
  className = "h-12 w-auto",
  style,
}) => {
  return (
    <img
      src="/logo-kartika-eka-paksi.png"
      alt="Kartika Eka Paksi - TNI AD"
      className={`object-contain select-none ${className}`}
      style={style}
      loading="eager"
      onError={(e) => {
        // Fallback to SVG if PNG fails to load
        (e.target as HTMLImageElement).src = "/logo-kartika-eka-paksi.svg";
      }}
    />
  );
};
