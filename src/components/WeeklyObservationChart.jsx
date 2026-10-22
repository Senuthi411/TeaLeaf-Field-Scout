import React, { useState } from 'react';
import { weeklyObservationTrends } from '../data/mockData';

/**
 * Weekly Observation Chart
 * @param {string} chartType - 'bar' (for Observation Statistics) or 'line' (for Analytics Dashboard)
 */
export default function WeeklyObservationChart({ chartType = 'bar' }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Y-axis ticks in steps of 3 up to 15
  const yTicks = [15, 12, 9, 6, 3, 0];
  const maxVal = 15;

  // Chart SVG coordinate parameters
  const svgWidth = 600;
  const svgHeight = 260;
  const paddingLeft = 35;
  const paddingRight = 25;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartAreaWidth = svgWidth - paddingLeft - paddingRight;
  const chartAreaHeight = svgHeight - paddingTop - paddingBottom;

  // Calculate coordinates for data points
  // DUMMY DATA: weeklyObservationTrends [ {week: "28 Sep", count: 11}, ...]
  const points = weeklyObservationTrends.map((d, i) => {
    // 4 points distributed evenly across X
    const x = paddingLeft + (i / (weeklyObservationTrends.length - 1)) * chartAreaWidth;
    const y = paddingTop + chartAreaHeight - (d.count / maxVal) * chartAreaHeight;
    return { ...d, x, y };
  });

  // Generate SVG path for line chart
  const linePath = points.reduce((acc, curr, idx) => {
    return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
  }, '');

  // Generate SVG path for area fill
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${paddingTop + chartAreaHeight} L ${points[0].x} ${paddingTop + chartAreaHeight} Z`;

  // Bar chart bar width and X positioning
  const barWidth = 32;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 lg:p-6 shadow-2xs flex flex-col justify-between h-full">
      {/* Chart Title */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-slate-900 tracking-tight">
          Observations captured per week
        </h2>
      </div>

      {/* Interactive Responsive SVG Chart */}
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            {/* Green gradient fill for the line/area chart */}
            <linearGradient id="areaGreenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22773b" stopOpacity="0.14" />
              <stop offset="100%" stopColor="#22773b" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Horizontal Gridlines & Y-Axis Labels (0, 3, 6, 9, 12, 15) */}
          {yTicks.map((val) => {
            const y = paddingTop + chartAreaHeight - (val / maxVal) * chartAreaHeight;
            return (
              <g key={val}>
                {/* Horizontal line */}
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={svgWidth - paddingRight}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1.2"
                />
                {/* Y-axis label */}
                <text
                  x={paddingLeft - 10}
                  y={y + 3.5}
                  textAnchor="end"
                  className="text-[11px] fill-slate-400 font-normal"
                >
                  {val}
                </text>
              </g>
            );
          })}

          {/* Render BAR CHART variant (Observation Statistics Page) */}
          {chartType === 'bar' && (
            <g>
              {points.map((pt, index) => {
                const barHeight = (pt.count / maxVal) * chartAreaHeight;
                const barY = paddingTop + chartAreaHeight - barHeight;
                const isHovered = hoveredIndex === index;

                return (
                  <g 
                    key={pt.week} 
                    className="cursor-pointer transition-opacity"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* The bar element */}
                    <rect
                      x={pt.x - barWidth / 2}
                      y={barY}
                      width={barWidth}
                      height={barHeight}
                      fill={isHovered ? "#166534" : "#23783a"}
                      rx="2"
                      className="transition-colors duration-150"
                    />

                    {/* Interactive hover tooltip over the bar */}
                    {isHovered && (
                      <g>
                        <rect
                          x={pt.x - 30}
                          y={barY - 32}
                          width="60"
                          height="24"
                          rx="4"
                          fill="#1e293b"
                        />
                        <text
                          x={pt.x}
                          y={barY - 17}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="600"
                        >
                          {/* DUMMY DATA: Count value */}
                          {pt.count} obs
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* Render LINE / AREA CHART variant (Analytics Dashboard Page) */}
          {chartType === 'line' && (
            <g>
              {/* Gradient Area Fill */}
              <path
                d={areaPath}
                fill="url(#areaGreenGrad)"
              />

              {/* Connecting Forest Green Line */}
              <path
                d={linePath}
                fill="none"
                stroke="#23783a"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data Point Circles */}
              {points.map((pt, index) => {
                const isHovered = hoveredIndex === index;
                return (
                  <g 
                    key={pt.week} 
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Outer glow ring on hover */}
                    {isHovered && (
                      <circle
                        cx={pt.x}
                        cy={pt.y}
                        r="8"
                        fill="#23783a"
                        fillOpacity="0.2"
                      />
                    )}

                    {/* White circle with green border */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isHovered ? "5" : "4"}
                      fill="#ffffff"
                      stroke="#23783a"
                      strokeWidth="2.5"
                      className="transition-all duration-150"
                    />

                    {/* Value Tooltip Bubble */}
                    {isHovered && (
                      <g>
                        <rect
                          x={pt.x - 28}
                          y={pt.y - 30}
                          width="56"
                          height="22"
                          rx="4"
                          fill="#1e293b"
                        />
                        <text
                          x={pt.x}
                          y={pt.y - 16}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="10"
                          fontWeight="600"
                        >
                          {/* DUMMY DATA: Observation count */}
                          {pt.count} obs
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* X-Axis Labels (28 Sep, 05 Oct, 12 Oct, 19 Oct) */}
          {points.map((pt) => (
            <text
              key={pt.week}
              x={pt.x}
              y={svgHeight - 14}
              textAnchor="middle"
              className="text-[11px] fill-slate-500 font-medium tracking-tight"
            >
              {/* DUMMY DATA: Week date string */}
              {pt.week}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
