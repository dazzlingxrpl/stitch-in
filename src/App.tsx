import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import TermsPage from './pages/TermsPage';
import IndividualsPage from './pages/IndividualsPage';
import BusinessesPage from './pages/BusinessesPage';
import ScrollToTop from './components/ScrollToTop';
import SeoHead from './components/SeoHead';

interface MenuItem {
  href: string;
  label: string;
  onClick?: () => void;
}

/** Full-viewport hero: transparent header until scroll passes ~1 viewport (same as home) */
const TRANSPARENT_HERO_PATHS = ['/', '/individuals', '/businesses'] as const;

function AppContent() {
  const [darkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPastHeroSection, setIsPastHeroSection] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      // Update theme-color meta tag for dark mode
      updateThemeColor('#09090b');
    } else {
      document.documentElement.classList.remove('dark');
      // Update theme-color meta tag for light mode
      updateThemeColor('#ffffff');
    }
  }, [darkMode]);

  // Close mobile menu on scroll
  React.useEffect(() => {
    const handleScroll = () => {
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

  React.useEffect(() => {
    const handleHeaderStateOnScroll = () => {
      const path = location.pathname;
      const useHeroHeader = (TRANSPARENT_HERO_PATHS as readonly string[]).includes(path);

      if (!useHeroHeader) {
        setIsPastHeroSection(true);
        return;
      }

      const heroHeight = window.innerHeight;
      const headerBand = 64; // h-16 nav — match transparent header over dark regions

      if (path === '/') {
        const visionEl = document.getElementById('our-vision');
        let overVisionDark = false;
        if (visionEl) {
          const rect = visionEl.getBoundingClientRect();
          overVisionDark = rect.top < headerBand && rect.bottom > 0;
        }
        const inHero =
          window.scrollY <= heroHeight - 80;
        // Transparent over hero video and over OUR VISION midnight panel (same as subpage heroes)
        setIsPastHeroSection(!(inHero || overVisionDark));
      } else {
        setIsPastHeroSection(window.scrollY > heroHeight - 80);
      }
    };

    handleHeaderStateOnScroll();
    window.addEventListener('scroll', handleHeaderStateOnScroll, { passive: true });
    window.addEventListener('resize', handleHeaderStateOnScroll);

    return () => {
      window.removeEventListener('scroll', handleHeaderStateOnScroll);
      window.removeEventListener('resize', handleHeaderStateOnScroll);
    };
  }, [location.pathname]);

  const updateThemeColor = (color: string) => {
    // Find existing theme-color meta tag
    let themeColorMeta = document.querySelector('meta[name="theme-color"]');
    
    if (themeColorMeta) {
      themeColorMeta.setAttribute('content', color);
    } else {
      // Create new meta tag if it doesn't exist
      themeColorMeta = document.createElement('meta');
      themeColorMeta.setAttribute('name', 'theme-color');
      themeColorMeta.setAttribute('content', color);
      document.head.appendChild(themeColorMeta);
    }
  };

  const isHeroDesignPage = location.pathname === '/hero-design';
  const isTransparentHeroHeader =
    (TRANSPARENT_HERO_PATHS as readonly string[]).includes(location.pathname) && !isPastHeroSection;
  const headerTextClasses = isTransparentHeroHeader
    ? 'text-white hover:border-white hover:text-gray-100'
    : 'text-midnight dark:text-gray-100 hover:border-midnight hover:text-gray-800 dark:hover:border-gray-300 dark:hover:text-gray-200';
  /** Same compact size in both pill modes */
  const headerLinkSizeClasses = 'text-xs sm:text-sm';
  const headerLogo = isTransparentHeroHeader
    ? '/images/roundlogo_trans_white.png'
    : '/images/roundlogo_trans_black.png';

  const scrollToAbout = () => {
    if (location.pathname === '/') {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to about section
      window.location.href = '/#about';
    }
  };

  const scrollToServices = () => {
    if (location.pathname === '/') {
      const partnersSection = document.getElementById('partners');
      if (partnersSection) {
        partnersSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to partners section
      window.location.href = '/#partners';
    }
  };

  const scrollToProjects = () => {
    if (location.pathname === '/') {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        projectsSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to projects section
      window.location.href = '/#projects';
    }
  };

  const scrollToGallery = () => {
    if (location.pathname === '/') {
      const gallerySection = document.getElementById('gallery');
      if (gallerySection) {
        gallerySection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to gallery section
      window.location.href = '/#gallery';
    }
  };

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page first, then scroll to contact section
      window.location.href = '/#contact';
    }
  };

  const scrollToHome = () => {
    if (location.pathname === '/') {
      // Scroll to top of the page
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigate to home page
      window.location.href = '/';
    }
  };

  const menuItems: MenuItem[] = [
    { href: '#', label: 'Home', onClick: scrollToHome },
    { href: '#', label: 'About Us', onClick: scrollToAbout },
    { href: '/individuals', label: 'For Individuals' },
    { href: '/businesses', label: 'For Businesses' },
    { href: '#', label: 'Case Studies', onClick: scrollToProjects },
    { href: '#', label: 'Gallery', onClick: scrollToGallery },
    { href: '#', label: 'Our Partners', onClick: scrollToServices },
    { href: '#', label: 'Contact', onClick: scrollToContact },
  ];

  return (
    <div className="App">
      <SeoHead />
      {/* Desktop Navigation - Hide on hero-design page */}
      {!isHeroDesignPage && (
        <nav className="fixed left-0 right-0 top-3 z-[60] hidden sm:block sm:top-4">
          {/* Same shell as page sections (e.g. gallery grid) so the pill aligns with images, not the full 7xl track */}
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div
              className={`flex w-full items-center justify-center gap-2 !rounded-3xl border-0 py-2 pl-4 pr-3 transition-[background-color,box-shadow,backdrop-filter] duration-300 sm:justify-between sm:gap-3 sm:px-6 sm:py-2.5 ${
                isTransparentHeroHeader
                  ? 'bg-transparent shadow-none backdrop-blur-none'
                  : 'bg-white/90 shadow-sm backdrop-blur-md dark:bg-gray-950/85 dark:backdrop-blur-md'
              }`}
            >
              <div className="flex flex-shrink-0 items-center">
                <Link to="/">
                  <img
                    src={headerLogo}
                    alt="Stitch In Logo"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <div className="hidden min-w-0 sm:ml-4 sm:flex sm:items-center sm:justify-end sm:gap-x-1 lg:gap-x-3">
                {menuItems.map((item, index) => (
                  item.onClick ? (
                    <button
                      key={`${item.label}-${index}`}
                      onClick={item.onClick}
                      className={`inline-flex flex-shrink-0 items-center border-b-2 border-transparent px-0.5 font-medium transition-colors sm:px-1 ${headerLinkSizeClasses} ${headerTextClasses}`}
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={`${item.label}-${index}`}
                      to={item.href}
                      className={`inline-flex flex-shrink-0 items-center border-b-2 border-transparent px-0.5 font-medium transition-colors sm:px-1 ${headerLinkSizeClasses} ${headerTextClasses}`}
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
              {/* <div className="hidden sm:flex sm:items-center">
                <button
                  className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-sm font-medium text-midnight dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setDarkMode((prev) => !prev)}
                >
                  {darkMode ? (
                    <svg className="h-5 w-5 text-midnight dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-midnight dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div> */}
            </div>
          </div>
        </nav>
      )}

      {/* Mobile Menu Button - Hide on hero-design page */}
      {!isHeroDesignPage && (
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          className={`sm:hidden fixed bottom-6 right-6 z-[100] flex aspect-square h-14 w-14 shrink-0 items-center justify-center overflow-hidden !rounded-full border-2 shadow-2xl transition-colors ${
            isMobileMenuOpen
              ? 'border-midnight bg-white dark:border-gray-100 dark:bg-gray-900'
              : 'border-white/20 bg-midnight/90 backdrop-blur-sm'
          }`}
        >
          <img
            src={
              isMobileMenuOpen
                ? '/images/roundlogo_trans_black.png'
                : '/images/roundlogo_trans_white.png'
            }
            alt=""
            className="h-9 w-9 object-contain transition-opacity duration-300"
            draggable={false}
          />
        </button>
      )}

      {/* Mobile Menu Panel - Hide on hero-design page */}
      {!isHeroDesignPage && (
        <div
          className={`sm:hidden fixed inset-x-0 bottom-0 z-[90] transform ${
            isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-t-[2rem] border-t-2 border-midnight dark:border-gray-100">
            <div className="px-4 pt-6 pb-8">
               <div className="flex flex-col space-y-4 text-left">
                 {menuItems.map((item, index) => (
                   item.onClick ? (
                     <button
                       key={`mobile-${item.label}-${index}`}
                       onClick={() => {
                         item.onClick?.();
                         setIsMobileMenuOpen(false);
                       }}
                       className="text-midnight dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 text-lg font-medium transition-colors text-left"
                     >
                       {item.label}
                     </button>
                   ) : (
                     <Link
                       key={`mobile-${item.label}-${index}`}
                       to={item.href}
                       onClick={() => setIsMobileMenuOpen(false)}
                       className="text-midnight dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 text-lg font-medium transition-colors"
                     >
                       {item.label}
                     </Link>
                   )
                 ))}
                {/* <button
                  className="inline-flex items-center justify-center text-midnight dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 text-lg transition-colors"
                  onClick={() => setDarkMode((prev) => !prev)}
                >
                  {darkMode ? (
                    <svg className="h-6 w-6 text-midnight dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-midnight dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}

      <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/individuals" element={<IndividualsPage darkMode={darkMode} />} />
            <Route path="/businesses" element={<BusinessesPage darkMode={darkMode} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </main>
        
        <ScrollToTop />
      </div>
    );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
