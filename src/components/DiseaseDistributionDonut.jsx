import React, { useState } from 'react';
import { suspectedDiseaseDistribution } from '../data/mockData';

export default function DiseaseDistributionDonut() {
  const [hoveredDisease, setHoveredDisease] = useState(null);

  // DUMMY DATA: Total observations for the center label
  const totalObservations = 33;

  // SVG Donut chart dimensions matching mockup
  const size = 300;
  const strokeWidth = 36;
  const center = size / 2;
  const radius = center - strokeWidth / 2 - 20;

  // Helper to convert polar coordinates to SVG arc path
  const describeArc = (x, y, r, startAngle, endAngle) => {
    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
      return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
      };
    };

    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

    return [
      'M', start.x, start.y,
      'A', r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  /**
   * DUMMY DATA: Donut Accent Segments directly modeled after 3840x21602.png:
   * The ring features a subtle neutral track with 4 cluster segments positioned at the cardinal directions:
   * - Top (12 o'clock): Purple (Algal leaf spot) & Blue (Grey blight)
   * - Right (3 o'clock): Blue (Grey blight) & Amber/Brown (Brown blight)
   * - Bottom (6 o'clock): Purple (Algal leaf spot) & Blue (Grey blight)
   * - Left (9 o'clock): Amber/Brown (Brown blight) & Blue (Grey blight)
   */
  const cardinalSegments = [
    // Top Cluster (around 0° / 360° from 12 o'clock)
    { id: 'algal_leaf_spot', name: 'Algal leaf spot', start: 340, end: 360, color: '#6d28d9' },
    { id: 'grey_blight', name: 'Grey blight', start: 0, end: 20, color: '#1d4ed8' },

    // Right Cluster (around 90° from 12 o'clock)
    { id: 'grey_blight', name: 'Grey blight', start: 70, end: 90, color: '#1d4ed8' },
    { id: 'brown_blight', name: 'Brown blight', start: 90, end: 110, color: '#b45309' },

    // Bottom Cluster (around 180° from 12 o'clock)
    { id: 'algal_leaf_spot', name: 'Algal leaf spot', start: 160, end: 180, color: '#6d28d9' },
    { id: 'grey_blight', name: 'Grey blight', start: 180, end: 200, color: '#1d4ed8' },

    // Left Cluster (around 270° from 12 o'clock)
    { id: 'brown_blight', name: 'Brown blight', start: 250, end: 270, color: '#b45309' },
    { id: 'grey_blight', name: 'Grey blight', start: 270, end: 290, color: '#1d4ed8' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Card Title */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
          Suspected disease distribution
        </h2>
      </div>

      {/* Donut Chart & Center Text */}
      <div className="relative flex items-center justify-center my-4">
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="select-none overflow-visible"
        >
          {/* Base Neutral Ring Track (Soft Gray Track) */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            fill="transparent"
            stroke="#edf2f7"
            strokeWidth={strokeWidth}
          />

          {/* Accent Cardinal Color Segments */}
          {/* DUMMY DATA: Render styled cardinal segments replicating 3840x21602.png */}
          {cardinalSegments.map((seg, idx) => {
            const isHovered = hoveredDisease === seg.id;
            return (
              <path
                key={idx}
                d={describeArc(center, center, radius, seg.start, seg.end)}
                fill="none"
                stroke={seg.color}
                strokeWidth={isHovered ? strokeWidth + 4 : strokeWidth}
                className="transition-all duration-200 cursor-pointer"
                onMouseEnter={() => setHoveredDisease(seg.id)}
                onMouseLeave={() => setHoveredDisease(null)}
              />
            );
          })}
        </svg>

        {/* Center Counter: "33 observations" */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
          <span className="text-3xl font-bold tracking-tight text-slate-900 leading-none">
            {/* DUMMY DATA: Center count 33 */}
            {totalObservations}
          </span>
          <span className="text-xs text-slate-400 font-normal mt-1">
            observations
          </span>
        </div>
      </div>

      {/* Legend Area (Exact bottom layout with bullet dots and right-aligned percentages) */}
      <div className="flex flex-col space-y-2.5 mt-2 pt-2">
        {/* DUMMY DATA: Mapping through disease categories */}
        {suspectedDiseaseDistribution.map((item) => {
          const isHovered = hoveredDisease === item.id;
          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredDisease(item.id)}
              onMouseLeave={() => setHoveredDisease(null)}
              className={`flex items-center justify-between text-xs py-1 px-2 rounded-md transition-colors cursor-pointer ${
                isHovered ? 'bg-slate-50 font-medium' : ''
              }`}
            >
              {/* Left: Colored bullet dot and disease name */}
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className={`text-slate-800 ${isHovered ? 'font-semibold' : 'font-normal'}`}>
                  {/* DUMMY DATA: Disease Name */}
                  {item.name}
                </span>
              </div>

              {/* Right: Count and percentage (e.g., "8 · 24%") */}
              <div className="text-slate-700 font-medium tracking-tight">
                {/* DUMMY DATA: Count and percentage representation */}
                {item.count} · {item.percentage}%
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
