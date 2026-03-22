import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export type GalleryLightboxItem = {
  src: string;
  alt: string;
  title: string;
  caption: string;
};

type GalleryLightboxProps = {
  items: readonly GalleryLightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

const SWIPE_THRESHOLD_PX = 50;

const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  items,
  activeIndex,
  onClose,
  onNavigate,
}) => {
  const open = activeIndex !== null && activeIndex >= 0 && activeIndex < items.length;
  const safeIndex = open ? activeIndex! : 0;
  const current = items[safeIndex];
  const touchStartX = useRef<number | null>(null);

  const goPrev = useCallback(() => {
    if (!open || items.length === 0) return;
    onNavigate((activeIndex! - 1 + items.length) % items.length);
  }, [open, activeIndex, items.length, onNavigate]);

  const goNext = useCallback(() => {
    if (!open || items.length === 0) return;
    onNavigate((activeIndex! + 1) % items.length);
  }, [open, activeIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose, goPrev, goNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (dx > SWIPE_THRESHOLD_PX) goPrev();
    else if (dx < -SWIPE_THRESHOLD_PX) goNext();
  };

  if (!open || !current) return null;

  const modal = (
    <div
      className="fixed inset-0 z-[200] bg-black/55 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
      onClick={onClose}
    >
      <div
        className="flex h-full max-h-[100dvh] flex-col"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Top bar */}
        <div className="flex shrink-0 items-center justify-between gap-3 px-3 py-3 sm:px-6">
          <p className="min-w-0 truncate text-sm font-medium text-white drop-shadow sm:text-base">
            {current.title}
            <span className="ml-2 text-white/70">
              {safeIndex + 1} / {items.length}
            </span>
          </p>
          <button
            type="button"
            onClick={onClose}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 text-sm font-medium text-white shadow-lg backdrop-blur-sm transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Close gallery"
          >
            <span className="hidden sm:inline">Close</span>
            <svg className="h-5 w-5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main stage */}
        <div className="relative flex min-h-0 flex-1 items-center justify-center px-12 pb-2 sm:px-24">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className="absolute left-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/50 hover:border-white/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:left-4 sm:h-14 sm:w-14"
            aria-label="Previous image"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <img
            src={current.src}
            alt={current.alt}
            className="max-h-[min(78vh,calc(100dvh-160px))] max-w-[min(92vw,1200px)] rounded-lg object-contain shadow-2xl ring-1 ring-white/10 select-none"
            decoding="async"
            draggable={false}
          />

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className="absolute right-2 top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-black/35 text-white shadow-lg backdrop-blur-sm transition hover:bg-black/50 hover:border-white/45 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:right-4 sm:h-14 sm:w-14"
            aria-label="Next image"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="shrink-0 px-4 pb-6 text-center sm:px-8">
          <p className="text-sm text-white/75">{current.caption}</p>
          <p className="mt-2 text-xs text-white/55">Use arrows or swipe · Esc to close</p>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default GalleryLightbox;
