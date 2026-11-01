import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' as ScrollBehavior
    });

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-PR8LBSNM57', {
        page_path: pathname + search,
        page_location: window.location.href
      });
    }
  }, [pathname, search]);

  return null;
};
