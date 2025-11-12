import { BehavioralDimensions as BehavioralDimensionsType } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';

interface Props {
  dimensions: BehavioralDimensionsType;
}

export function BehavioralDimensions({ dimensions }: Props) {
  const dimensionsArray = Object.values(dimensions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Behavioral Dimensions</CardTitle>
        <p className="text-gray-600 mt-2">
          Your communication patterns analyzed across 5 key dimensions
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {dimensionsArray.map((dimension) => (
            <DimensionBar key={dimension.name} dimension={dimension} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

interface DimensionBarProps {
  dimension: BehavioralDimensionsType[keyof BehavioralDimensionsType];
}

function DimensionBar({ dimension }: DimensionBarProps) {
  // Score is 0-100, where 0 is left label and 100 is right label
  const score = dimension.score;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-gray-900">{dimension.name}</h4>
        <span className="text-xs text-gray-500">{score}%</span>
      </div>

      <p className="text-sm text-gray-600 mb-3">{dimension.description}</p>

      <div className="relative">
        {/* Labels */}
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>{dimension.leftLabel}</span>
          <span>{dimension.rightLabel}</span>
        </div>

        {/* Progress Bar */}
        <div className="relative w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 opacity-30" />

          {/* Marker */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-blue-600 shadow-lg transition-all duration-500"
            style={{ left: `calc(${score}% - 2px)` }}
          />

          {/* Fill to marker */}
          <div
            className="absolute top-0 bottom-0 left-0 bg-blue-500 opacity-20 transition-all duration-500"
            style={{ width: `${score}%` }}
          />
        </div>

        {/* Midpoint Indicator */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-px h-4 bg-gray-300" />
      </div>
    </div>
  );
}
