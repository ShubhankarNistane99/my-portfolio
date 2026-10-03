import React, { useState } from 'react';
import { Image as ImageIcon, User } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackType?: 'avatar' | 'project';
  fallbackText?: string;
  containerClassName?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'Image',
  className = '',
  containerClassName = '',
  fallbackType = 'project',
  fallbackText,
  ...rest
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (!src || hasError) {
    if (fallbackType === 'avatar') {
      return (
        <div
          role="img"
          aria-label={alt}
          className={`flex items-center justify-center bg-stone-200 dark:bg-stone-800 text-stone-600 dark:text-stone-300 font-semibold border border-stone-300/80 dark:border-stone-700/80 select-none ${containerClassName || className}`}
        >
          {fallbackText ? (
            <span className="text-xl md:text-2xl font-mono tracking-wider">
              {fallbackText.slice(0, 2).toUpperCase()}
            </span>
          ) : (
            <User className="w-1/2 h-1/2 opacity-70" />
          )}
        </div>
      );
    }

    return (
      <div
        role="img"
        aria-label={alt}
        className={`relative flex flex-col items-center justify-center bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-500 overflow-hidden select-none ${containerClassName || className}`}
      >
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px] dark:bg-[radial-gradient(#fff_1px,transparent_1px)]" />
        <ImageIcon className="w-8 h-8 mb-2 opacity-50 stroke-[1.5]" />
        <span className="text-xs font-mono uppercase tracking-wider text-stone-500 dark:text-stone-400 text-center px-4">
          {fallbackText || alt || 'Preview Asset'}
        </span>
        <span className="text-[10px] text-stone-400 dark:text-stone-600 mt-1">
          {src || '/placeholder.jpg'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-stone-200/60 dark:bg-stone-800/60 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={() => setHasError(true)}
        onLoad={() => setIsLoading(false)}
        referrerPolicy="no-referrer"
        loading="lazy"
        {...rest}
      />
    </div>
  );
};
