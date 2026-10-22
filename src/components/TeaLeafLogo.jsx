import React from 'react';

/**
 * TeaLeafLogo component
 * Renders the iconic tea leaf logo badge with accurate styling matching the UI designs.
 */
export function TeaLeafIcon({ className = "w-6 h-6", strokeWidth = 1.8 }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Organic tea leaf contour */}
      <path d="M12 2C6.5 2 3 6.5 3 12c0 5 3.5 9 8 9.8" />
      <path d="M12 2c5.5 0 9 4.5 9 10 0 5-3.5 9-8 9.8" />
      {/* Central leaf vein extending to stem */}
      <path d="M11 21.8V11" />
      {/* Side secondary leaf veins */}
      <path d="M11 15c2.5-1 4-3 4.5-5" />
      <path d="M11 18c-2-1-3-2.5-3.5-4" />
    </svg>
  );
}

/**
 * TeaLeafBrand: Text logo with "TeaLeaf" in forest green / white and "Field Scout" in light vibrant green
 */
export function TeaLeafBrand({ light = false, size = "default" }) {
  const isLarge = size === "large";
  return (
    <div className="flex items-center gap-1 select-none font-bold tracking-tight">
      <span className={`${light ? 'text-white' : 'text-[#143d23]'} ${isLarge ? 'text-2xl' : 'text-lg font-bold'}`}>
        TeaLeaf
      </span>
      <span className={`text-[#3cb35a] ${isLarge ? 'text-2xl font-bold' : 'text-lg font-semibold'}`}>
        Field Scout
      </span>
    </div>
  );
}
