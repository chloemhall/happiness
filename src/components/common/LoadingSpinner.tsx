import { cn } from '../../utils/cn';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  message?: string;
}

export function LoadingSpinner({ size = 'md', className, message }: LoadingSpinnerProps) {
  const sizeStyles = {
    sm: 'h-4 w-4 border-2',
    md: 'h-8 w-8 border-3',
    lg: 'h-12 w-12 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-blue-600 border-t-transparent',
          sizeStyles[size]
        )}
      />
      {message && <p className="mt-4 text-gray-600 text-sm">{message}</p>}
    </div>
  );
}

interface ProgressBarProps {
  progress: number; // 0-100
  message?: string;
  className?: string;
}

export function ProgressBar({ progress, message, className }: ProgressBarProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
      {message && (
        <p className="mt-2 text-sm text-gray-600 text-center">
          {message} ({Math.round(progress)}%)
        </p>
      )}
    </div>
  );
}
