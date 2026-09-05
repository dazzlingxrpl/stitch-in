/// <reference types="react-scripts" />

interface Window {
  /** Set only by scripts/prerender.js in headless Chromium. Never set for real users. */
  __PRERENDER__?: boolean;
}
