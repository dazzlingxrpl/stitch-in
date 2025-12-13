import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import ContactPage from './pages/ContactPage';
import IndividualsPage from './pages/IndividualsPage';
import BusinessesPage from './pages/BusinessesPage';
import ScrollToTop from './components/ScrollToTop';

interface MenuItem {
  href: string;
  label: string;
  onClick?: () => void;
}

function AppContent() {
  const [darkMode, setDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      // Update theme-color meta tag for dark mode
      updateThemeColor('#111827');
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobileMenuOpen]);

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
      {/* Desktop Navigation - Hide on hero-design page */}
      {!isHeroDesignPage && (
        <nav className="fixed w-full z-[60] backdrop-blur-sm bg-white/80 dark:bg-gray-900/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/">
                  <img
                    src={darkMode ? "/images/main_logo_white.png" : "/images/main_logo_black.png"}
                    alt="Architecture Logo"
                    className="h-8 w-auto"
                  />
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                {menuItems.map((item, index) => (
                  item.onClick ? (
                    <button
                      key={`${item.label}-${index}`}
                      onClick={item.onClick}
                      className="border-transparent text-gray-900 dark:text-gray-100 hover:border-gray-900 hover:text-gray-700 dark:hover:border-white dark:hover:text-gray-300 inline-flex items-center px-1 border-b-2 text-sm font-medium"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      key={`${item.label}-${index}`}
                      to={item.href}
                      className="border-transparent text-gray-900 dark:text-gray-100 hover:border-gray-900 hover:text-gray-700 dark:hover:border-white dark:hover:text-gray-300 inline-flex items-center px-1 border-b-2 text-sm font-medium"
                    >
                      {item.label}
                    </Link>
                  )
                ))}
              </div>
              {/* <div className="hidden sm:flex sm:items-center">
                <button
                  className="inline-flex items-center px-2 py-1 border border-transparent rounded-md text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                  onClick={() => setDarkMode((prev) => !prev)}
                >
                  {darkMode ? (
                    <svg className="h-5 w-5 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          onClick={() => setIsMobileMenuOpen(prev => !prev)}
          className={`sm:hidden fixed bottom-6 right-6 z-[100] w-14 h-14 flex items-center justify-center rounded-full shadow-2xl transition-colors border-2 ${
            isMobileMenuOpen 
              ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-900 dark:border-gray-100' 
              : 'bg-gray-900/90 backdrop-blur-sm text-white border-white/20'
          }`}
        >
          <svg
            className={`w-6 h-6 transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      )}

      {/* Mobile Menu Panel - Hide on hero-design page */}
      {!isHeroDesignPage && (
        <div
          className={`sm:hidden fixed inset-x-0 bottom-0 z-[90] transform ${
            isMobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="bg-white dark:bg-gray-900 shadow-lg rounded-t-3xl border-t-2 border-gray-900 dark:border-gray-100">
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
                       className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 text-lg font-medium transition-colors text-left"
                     >
                       {item.label}
                     </button>
                   ) : (
                     <Link
                       key={`mobile-${item.label}-${index}`}
                       to={item.href}
                       onClick={() => setIsMobileMenuOpen(false)}
                       className="text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 text-lg font-medium transition-colors"
                     >
                       {item.label}
                     </Link>
                   )
                 ))}
                {/* <button
                  className="inline-flex items-center justify-center text-gray-900 dark:text-gray-100 hover:text-gray-700 dark:hover:text-gray-300 text-lg transition-colors"
                  onClick={() => setDarkMode((prev) => !prev)}
                >
                  {darkMode ? (
                    <svg className="h-6 w-6 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-gray-900 dark:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
            <Route path="/" element={<HomePage darkMode={darkMode} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/individuals" element={<IndividualsPage darkMode={darkMode} />} />
            <Route path="/businesses" element={<BusinessesPage darkMode={darkMode} />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/contact" element={<ContactPage />} />
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
