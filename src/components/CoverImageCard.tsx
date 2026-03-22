import React, { useCallback, useEffect, useRef, useState } from 'react';

type LoadStatus = 'loading' | 'loaded' | 'error';

export interface CoverImageCardProps {
  /** Public URL path e.g. /images/foo.png */
  src: string;
  alt: string;
  /** Tailwind height classes for the card shell */
  heightClassName?: string;
  className?: string;
  /** Overlay + content (positioned absolute typically) */
  children: React.ReactNode;
}

/**
 * Full-bleed cover image for cards (replaces fragile CSS background-image).
 * - Shows a skeleton while loading (avoids grey empty blocks on slow mobile)
 * - Retries once on error (flaky networks)
 * - Dev-only load timing + error logs
 */
const CoverImageCard: React.FC<CoverImageCardProps> = ({
  src,
  alt,
  heightClassName = 'h-80 sm:h-96 lg:h-[500px]',
  className = '',
  children,
}) => {
  const [status, setStatus] = useState<LoadStatus>('loading');
  const [activeSrc, setActiveSrc] = useState(src);
  const retryRef = useRef(0);
  const loadStartRef = useRef<number | null>(null);

  useEffect(() => {
    setStatus('loading');
    setActiveSrc(src);
    retryRef.current = 0;
    loadStartRef.current = performance.now();
  }, [src]);

  const logDev = useCallback((message: string, extra?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.debug(`[StitchIn CoverImage] ${message}`, { src, ...extra });
    }
  }, [src]);

  const handleLoad = useCallback(() => {
    setStatus('loaded');
    const start = loadStartRef.current;
    if (start != null) {
      const ms = Math.round(performance.now() - start);
      logDev(`loaded in ${ms}ms`, { ms });
    }
  }, [logDev]);

  const handleError = useCallback(() => {
    if (retryRef.current < 1) {
      retryRef.current += 1;
      const bust = `${src}${src.includes('?') ? '&' : '?'}retry=${Date.now()}`;
      logDev('load failed, retrying once', { retrySrc: bust });
      setActiveSrc(bust);
      return;
    }
    setStatus('error');
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn('[StitchIn CoverImage] failed after retry', { src });
    }
  }, [logDev, src]);

  return (
    <div className={`relative w-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${heightClassName} ${className}`}>
      {status === 'loading' && (
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-br from-gray-200 via-gray-100 to-gray-300 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 animate-pulse"
          aria-hidden
        />
      )}

      {status === 'error' && (
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-br from-slate-600 to-slate-900"
          role="img"
          aria-label={alt}
        />
      )}

      <img
        src={activeSrc}
        alt={alt}
        width={1200}
        height={800}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(max-width: 768px) 100vw, 50vw"
        className={`absolute inset-0 z-[2] h-full w-full object-cover transition-opacity duration-500 ${
          status === 'loaded' ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />

      <div className="absolute inset-0 z-[3]">{children}</div>
    </div>
  );
};

export default CoverImageCard;
