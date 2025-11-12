import { useState } from 'react';
import { BehavioralDimensions } from '../../types';

interface RadarChartProps {
  dimensions: BehavioralDimensions;
}

interface Point {
  x: number;
  y: number;
}

export function RadarChart({ dimensions }: RadarChartProps) {
  const [hoveredAxis, setHoveredAxis] = useState<string | null>(null);

  // Chart configuration
  const size = 400;
  const center = size / 2;
  const radius = size / 2 - 60;
  const maxScore = 100;

  // Convert dimensions object to array for easier processing
  const dimensionArray = [
    { key: 'assertiveness', ...dimensions.assertiveness },
    { key: 'emotionalExpression', ...dimensions.emotionalExpression },
    { key: 'cognitiveStyle', ...dimensions.cognitiveStyle },
    { key: 'interpersonalFocus', ...dimensions.interpersonalFocus },
    { key: 'temporalOrientation', ...dimensions.temporalOrientation },
  ];

  const angleStep = (2 * Math.PI) / dimensionArray.length;

  // Calculate point position on the chart
  const getPoint = (index: number, score: number): Point => {
    const angle = index * angleStep - Math.PI / 2; // Start from top
    const distance = (score / maxScore) * radius;
    return {
      x: center + distance * Math.cos(angle),
      y: center + distance * Math.sin(angle),
    };
  };

  // Generate grid circles
  const gridLevels = [20, 40, 60, 80, 100];
  const gridCircles = gridLevels.map((level) => {
    const points = dimensionArray.map((_, index) => getPoint(index, level));
    const pathData = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
    return { level, pathData };
  });

  // Generate data polygon
  const dataPoints = dimensionArray.map((dim, index) => getPoint(index, dim.score));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  // Generate axis lines
  const axes = dimensionArray.map((dim, index) => {
    const endPoint = getPoint(index, 100);
    return {
      key: dim.key,
      name: dim.name,
      score: dim.score,
      description: dim.description,
      leftLabel: dim.leftLabel,
      rightLabel: dim.rightLabel,
      x1: center,
      y1: center,
      x2: endPoint.x,
      y2: endPoint.y,
    };
  });

  // Generate labels at the end of each axis
  const labels = dimensionArray.map((dim, index) => {
    const labelPoint = getPoint(index, 115); // Place labels outside the chart
    return {
      key: dim.key,
      name: dim.name,
      x: labelPoint.x,
      y: labelPoint.y,
    };
  });

  return (
    <div className="relative">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${size} ${size}`}
        className="max-w-md mx-auto"
      >
        {/* Background grid circles */}
        {gridCircles.map(({ level, pathData }) => (
          <path
            key={level}
            d={pathData}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={level === 100 ? 0.3 : 0.15}
          />
        ))}

        {/* Axis lines */}
        {axes.map((axis) => (
          <line
            key={axis.key}
            x1={axis.x1}
            y1={axis.y1}
            x2={axis.x2}
            y2={axis.y2}
            stroke="#d1d5db"
            strokeWidth="1.5"
          />
        ))}

        {/* Data polygon (filled area) */}
        <path
          d={dataPath}
          fill="url(#radarGradient)"
          fillOpacity="0.4"
          stroke="#3b82f6"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <circle
            key={index}
            cx={point.x}
            cy={point.y}
            r="6"
            fill="#3b82f6"
            stroke="#ffffff"
            strokeWidth="2"
            className="transition-all duration-200 hover:r-8 cursor-pointer"
            onMouseEnter={() => setHoveredAxis(dimensionArray[index].key)}
            onMouseLeave={() => setHoveredAxis(null)}
          />
        ))}

        {/* Axis labels */}
        {labels.map((label) => {
          const isHovered = hoveredAxis === label.key;
          return (
            <text
              key={label.key}
              x={label.x}
              y={label.y}
              textAnchor="middle"
              className={`text-sm font-medium transition-all duration-200 ${
                isHovered ? 'fill-blue-600 font-semibold' : 'fill-gray-700'
              }`}
              onMouseEnter={() => setHoveredAxis(label.key)}
              onMouseLeave={() => setHoveredAxis(null)}
              style={{ cursor: 'pointer' }}
            >
              {label.name}
            </text>
          );
        })}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
      </svg>

      {/* Tooltip */}
      {hoveredAxis && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-white rounded-lg shadow-lg p-4 border border-gray-200 max-w-sm z-10 animate-fade-in">
          {dimensionArray
            .filter((d) => d.key === hoveredAxis)
            .map((dim) => (
              <div key={dim.key}>
                <h4 className="font-semibold text-gray-900 mb-1">{dim.name}</h4>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">{dim.leftLabel}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all"
                        style={{ width: `${dim.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-blue-600">{dim.score}</span>
                  </div>
                  <span className="text-sm text-gray-600">{dim.rightLabel}</span>
                </div>
                <p className="text-sm text-gray-700">{dim.description}</p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
