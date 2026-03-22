import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // Match header deep links (e.g. /#contact): scroll to section instead of top
    const id = hash?.replace(/^#/, '');
    if (id) {
      const scrollToId = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          return true;
        }
        return false;
      };
      if (!scrollToId()) {
        const t = window.setTimeout(() => scrollToId(), 100);
        return () => window.clearTimeout(t);
      }
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
