import { EnneagramTypeResult, Evidence } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';

interface Props {
  typeResult: EnneagramTypeResult;
  evidence: Evidence[];
}

export function TypeIdentification({ typeResult, evidence }: Props) {
  const { primaryType, wing, confidence, description } = typeResult;

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return 'text-green-600 bg-green-100';
    if (conf >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-orange-600 bg-orange-100';
  };

  const getConfidenceLabel = (conf: number) => {
    if (conf >= 80) return 'High Confidence';
    if (conf >= 60) return 'Moderate Confidence';
    return 'Low Confidence';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enneagram Type Identification</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-6">
          {/* Type Display */}
          <div className="text-center py-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-6xl font-bold text-blue-600">
                {primaryType}
              </span>
              {wing && (
                <span className="text-3xl font-semibold text-indigo-600">
                  {wing}
                </span>
              )}
            </div>
            <p className="mt-4 text-lg text-gray-700 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Confidence Score */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-700">Confidence Score</p>
              <p className="text-xs text-gray-500">Based on linguistic pattern analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className={`text-sm font-semibold ${getConfidenceColor(confidence).split(' ')[0]}`}>
                  {getConfidenceLabel(confidence)}
                </p>
                <p className="text-2xl font-bold text-gray-900">{confidence}%</p>
              </div>
              <div className={`px-3 py-1 rounded-full ${getConfidenceColor(confidence)}`}>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Supporting Evidence */}
          {evidence.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                Supporting Evidence
              </h4>
              <div className="space-y-4">
                {evidence.map((item, index) => (
                  <div
                    key={index}
                    className="border-l-4 border-blue-500 bg-gray-50 p-4 rounded-r-lg"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.platform === 'LinkedIn'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}>
                        {item.platform}
                      </span>
                    </div>
                    <blockquote className="text-gray-700 italic mb-2">
                      "{item.quote}"
                    </blockquote>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Analysis:</span> {item.analysis}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
