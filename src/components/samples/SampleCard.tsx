import { CelebritySample } from '../../data/celebritySamples';

interface SampleCardProps {
  sample: CelebritySample;
}

export function SampleCard({ sample }: SampleCardProps) {
  const { name, role, avatar, typeIdentification, behavioralDimensions, evidence } = sample;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mx-2">
      {/* Header */}
      <div className="flex items-start gap-4 mb-6">
        <div className="text-5xl">{avatar}</div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-600">{role}</p>
          <div className="mt-2 inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
            <span>Type {typeIdentification.primaryType}{typeIdentification.wing}</span>
            <span className="text-indigo-400">•</span>
            <span>{typeIdentification.confidence}% confidence</span>
          </div>
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-700 mb-6 italic">
        "{typeIdentification.description}"
      </p>

      {/* Key Dimensions - Show 3 most distinctive */}
      <div className="space-y-3 mb-6">
        <h4 className="text-sm font-semibold text-gray-900 uppercase tracking-wide">
          Key Behavioral Patterns
        </h4>
        {[behavioralDimensions.assertiveness, behavioralDimensions.emotionalExpression, behavioralDimensions.cognitiveStyle]
          .map((dimension, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-600">{dimension.name}</span>
                <span className="font-medium text-gray-900">{dimension.score}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1.5 rounded-full transition-all"
                  style={{ width: `${dimension.score}%` }}
                />
              </div>
            </div>
          ))}
      </div>

      {/* Sample Evidence */}
      <div className="border-t border-gray-200 pt-4">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Sample Evidence</h4>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-700 italic mb-2">"{evidence[0].quote}"</p>
          <div className="flex items-center gap-2 text-xs">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-100 text-blue-700 font-medium">
              {evidence[0].platform}
            </span>
            <span className="text-gray-500">{evidence[0].analysis}</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Upload your own posts to get detailed insights like this
        </p>
      </div>
    </div>
  );
}
