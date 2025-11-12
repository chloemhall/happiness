import { GrowthRecommendation } from '../../types';
import { Card, CardHeader, CardTitle, CardContent } from '../common/Card';

interface Props {
  recommendations: GrowthRecommendation[];
}

export function GrowthRecommendations({ recommendations }: Props) {
  const getCategoryIcon = (category: GrowthRecommendation['category']) => {
    switch (category) {
      case 'integration':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        );
      case 'awareness':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
          </svg>
        );
      case 'practice':
        return (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  const getCategoryColor = (category: GrowthRecommendation['category']) => {
    switch (category) {
      case 'integration':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'awareness':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'practice':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const getCategoryLabel = (category: GrowthRecommendation['category']) => {
    switch (category) {
      case 'integration':
        return 'Integration Path';
      case 'awareness':
        return 'Self-Awareness';
      case 'practice':
        return 'Daily Practice';
    }
  };

  const getPlatformBadge = (platform?: GrowthRecommendation['platform']) => {
    if (!platform || platform === 'both') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
          All Platforms
        </span>
      );
    }

    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        platform === 'LinkedIn'
          ? 'bg-blue-100 text-blue-800'
          : 'bg-sky-100 text-sky-800'
      }`}>
        {platform}
      </span>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Growth Recommendations</CardTitle>
        <p className="text-gray-600 mt-2">
          Personalized suggestions based on your Enneagram type and communication patterns
        </p>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div
              key={rec.id}
              className={`border-2 rounded-lg p-5 transition-all hover:shadow-md ${getCategoryColor(rec.category)}`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className={`flex-shrink-0 p-2 rounded-lg ${getCategoryColor(rec.category)}`}>
                  {getCategoryIcon(rec.category)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-gray-900">
                        {index + 1}.
                      </span>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {rec.title}
                      </h4>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">
                    {rec.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(rec.category)}`}>
                      {getCategoryLabel(rec.category)}
                    </span>
                    {getPlatformBadge(rec.platform)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Note */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex gap-3">
            <svg className="flex-shrink-0 w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div>
              <h5 className="text-sm font-semibold text-blue-900 mb-1">
                Remember
              </h5>
              <p className="text-sm text-blue-800">
                Growth is a journey, not a destination. Start with one recommendation that resonates most with you and practice it consistently for 2-3 weeks before adding more.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
