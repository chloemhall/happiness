import { useState } from 'react';
import { EnneagramType } from '../../types';

interface IntegrationPathCardProps {
  primaryType: EnneagramType;
  integrationPath?: EnneagramType;
  stressPath?: EnneagramType;
}

const TYPE_DESCRIPTIONS: Record<EnneagramType, string> = {
  1: 'Perfectionist',
  2: 'Helper',
  3: 'Achiever',
  4: 'Individualist',
  5: 'Investigator',
  6: 'Loyalist',
  7: 'Enthusiast',
  8: 'Challenger',
  9: 'Peacemaker',
};

const INTEGRATION_DESCRIPTIONS: Record<string, string> = {
  '1-7': 'Become more spontaneous and joyful',
  '2-4': 'Connect with authentic self and creativity',
  '3-6': 'Build trust and collaborative relationships',
  '4-1': 'Find structure and principled action',
  '5-8': 'Assert yourself and take confident action',
  '6-9': 'Find inner peace and trust',
  '7-5': 'Develop depth and focused investigation',
  '8-2': 'Show vulnerability and care for others',
  '9-3': 'Take action and pursue goals',
};

const STRESS_DESCRIPTIONS: Record<string, string> = {
  '1-4': 'May become moody and withdrawn',
  '2-8': 'Can become aggressive and demanding',
  '3-9': 'May disengage and become apathetic',
  '4-2': 'Can become clingy and attention-seeking',
  '5-7': 'May scatter energy and avoid depth',
  '6-3': 'Can become competitive and image-focused',
  '7-1': 'May become critical and perfectionistic',
  '8-5': 'Can withdraw and become isolated',
  '9-6': 'May become anxious and doubtful',
};

export function IntegrationPathCard({
  primaryType,
  integrationPath,
  stressPath,
}: IntegrationPathCardProps) {
  const [showIntegrationTooltip, setShowIntegrationTooltip] = useState(false);
  const [showStressTooltip, setShowStressTooltip] = useState(false);

  const integrationKey = integrationPath ? `${primaryType}-${integrationPath}` : '';
  const stressKey = stressPath ? `${primaryType}-${stressPath}` : '';

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Growth & Stress Paths</h3>

      <div className="space-y-4">
        {/* Integration Path */}
        {integrationPath && (
          <div className="relative">
            <div
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-green-200 cursor-pointer hover:border-green-300 transition-colors"
              onMouseEnter={() => setShowIntegrationTooltip(true)}
              onMouseLeave={() => setShowIntegrationTooltip(false)}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Growth Path:</span>
                  <span className="font-semibold text-gray-900">
                    Type {primaryType} → {integrationPath}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Moving toward {TYPE_DESCRIPTIONS[integrationPath]}
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Integration Tooltip */}
            {showIntegrationTooltip && integrationKey && INTEGRATION_DESCRIPTIONS[integrationKey] && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-10 animate-fade-in">
                <p className="text-sm text-gray-700">{INTEGRATION_DESCRIPTIONS[integrationKey]}</p>
              </div>
            )}
          </div>
        )}

        {/* Stress Path */}
        {stressPath && (
          <div className="relative">
            <div
              className="flex items-center gap-3 p-4 bg-white rounded-lg border border-red-200 cursor-pointer hover:border-red-300 transition-colors"
              onMouseEnter={() => setShowStressTooltip(true)}
              onMouseLeave={() => setShowStressTooltip(false)}
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-red-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-600">Stress Path:</span>
                  <span className="font-semibold text-gray-900">
                    Type {primaryType} → {stressPath}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  Under pressure, may adopt {TYPE_DESCRIPTIONS[stressPath]} traits
                </p>
              </div>
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>

            {/* Stress Tooltip */}
            {showStressTooltip && stressKey && STRESS_DESCRIPTIONS[stressKey] && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-lg shadow-lg p-4 border border-gray-200 z-10 animate-fade-in">
                <p className="text-sm text-gray-700">{STRESS_DESCRIPTIONS[stressKey]}</p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
        <p className="text-xs text-gray-600">
          <span className="font-medium">💡 Tip:</span> Hover over each path to learn more about how
          to grow or manage stress
        </p>
      </div>
    </div>
  );
}
