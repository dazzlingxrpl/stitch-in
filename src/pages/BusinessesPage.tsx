import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface BusinessesPageProps {
  darkMode: boolean;
}

const BusinessesPage: React.FC<BusinessesPageProps> = ({ darkMode }) => {
  const location = useLocation();

  const scrollToContact = () => {
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to home page with hash - HomePage will handle scrolling
      window.location.href = '/#contact';
    }
  };
  // Business Services section refs
  const businessServicesSectionRef = useRef<HTMLElement>(null);
  const businessServicesHeadingRef = useRef<HTMLHeadingElement>(null);
  const businessServicesContentRef = useRef<HTMLDivElement>(null);
  
  // Individual business service refs
  const businessService1Ref = useRef<HTMLDivElement>(null);
  const businessService1ImageRef = useRef<HTMLDivElement>(null);
  const businessService2Ref = useRef<HTMLDivElement>(null);
  const businessService2ImageRef = useRef<HTMLDivElement>(null);
  const businessService3Ref = useRef<HTMLDivElement>(null);
  const businessService3ImageRef = useRef<HTMLDivElement>(null);
  const businessService4Ref = useRef<HTMLDivElement>(null);
  const businessService4ImageRef = useRef<HTMLDivElement>(null);
  const businessService5Ref = useRef<HTMLDivElement>(null);
  const businessService5ImageRef = useRef<HTMLDivElement>(null);
  const businessService6Ref = useRef<HTMLDivElement>(null);
  const businessService6ImageRef = useRef<HTMLDivElement>(null);

  // Business Services animations
  useEffect(() => {
    const setupBusinessServicesAnimations = () => {
      if (businessServicesSectionRef.current) {
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        
        // Set initial state for all business service items
        const businessServiceItems = [
          businessService1Ref.current, businessService1ImageRef.current,
          businessService2Ref.current, businessService2ImageRef.current,
          businessService3Ref.current, businessService3ImageRef.current,
          businessService4Ref.current, businessService4ImageRef.current,
          businessService5Ref.current, businessService5ImageRef.current,
          businessService6Ref.current, businessService6ImageRef.current
        ].filter(Boolean);

        gsap.set(businessServiceItems, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 80,
          scale: isMobile ? 1 : 0.9
        });

        // Individual ScrollTrigger for Business Service 1 - Scan to BIM (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: businessService1Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(businessService1Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(businessService1ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Business Service 2 - Architectural Design (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: businessService2Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(businessService2Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(businessService2ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Business Service 3 - Interior Design (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: businessService3Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(businessService3Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(businessService3ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Business Service 4 - Technical Drawings (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: businessService4Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(businessService4Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(businessService4ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Business Service 5 - Product BIM Modelling (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: businessService5Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(businessService5Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(businessService5ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Business Service 6 - BIM Management (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: businessService6Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(businessService6Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(businessService6ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }
      }
    };

    const timer = setTimeout(setupBusinessServicesAnimations, 100);

    // Add resize listener for responsive behavior
    const handleResize = () => {
      setupBusinessServicesAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        {/* Hero Section - For Businesses */}
        <section className="relative min-h-screen flex items-center justify-center z-10" 
                 style={{
                   backgroundImage: 'url(/images/homepage_business_op1.png)',
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   backgroundRepeat: 'no-repeat'
                 }}>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                FOR BUSINESSES
              </h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl text-white leading-relaxed">
                  Our architectural consultancy helps you make the most of your space — beautifully, functionally, and efficiently. With thoughtful planning from the start, we ensure your project works seamlessly, avoiding costly revisions later. Every design decision is guided by clarity, creativity, and practicality, so your vision takes shape with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Services Section */}
        <section id="business-services" ref={businessServicesSectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
              {/* Business Service details */}
              <div ref={businessServicesContentRef} className="flex-1 w-full">
                 {/* Horizontal line at top */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
                 
                {/* Scan to BIM Service content - responsive layout */}
                <div ref={businessService1Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Building image */}
                  <div ref={businessService1ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                    <img
                      src="/images/bim.png"
                      alt="Scan to BIM"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Right side - Text content */}
                  <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                    <div className="text-right">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                        Scan to BIM
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                        Transform existing buildings into accurate digital models using advanced 3D scanning technology. Our Scan to BIM service creates precise as-built documentation, enabling better decision-making, efficient renovations, and seamless facility management.
                      </p>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="mt-auto">
                      <ul className="space-y-2 text-right">
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">3D Laser Scanning</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Accurate Digital Models</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">As-Built Documentation</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Facility Management</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Horizontal line separator */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
                
                {/* Architectural Design Service content - responsive layout */}
                <div ref={businessService2Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Text content */}
                  <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                        Architectural Design
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                        From concept to completion, we design buildings that inspire and function flawlessly. Our architectural solutions balance aesthetic appeal with practical requirements, creating spaces that enhance productivity and reflect your brand identity.
                      </p>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="mt-auto">
                      <ul className="space-y-2 text-left">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Concept Development</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Brand Integration</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Functional Design</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Aesthetic Excellence</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - Building image */}
                  <div ref={businessService2ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                    <img
                      src="/images/warehouses.png"
                      alt="Architectural Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Horizontal line separator */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
                
                {/* Interior Design Service content - responsive layout */}
                <div ref={businessService3Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Building image */}
                  <div ref={businessService3ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                    <img
                      src="/images/office_space.png"
                      alt="Interior Design"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Right side - Text content */}
                  <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                    <div className="text-right">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                        Interior Design
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                        Create inspiring work environments that boost productivity and employee satisfaction. Our interior design solutions optimize space utilization, enhance workflow efficiency, and create welcoming atmospheres that reflect your company culture.
                      </p>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="mt-auto">
                      <ul className="space-y-2 text-right">
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Space Optimization</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Workflow Enhancement</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Employee Satisfaction</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Company Culture</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Horizontal line separator */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
                
                {/* Technical Drawings Service content - responsive layout */}
                <div ref={businessService4Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Text content */}
                  <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                        Technical Drawings
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                        We produce detailed technical drawings that ensure construction accuracy and compliance with all standards. Our precise documentation reduces errors on site, simplifies coordination, and keeps projects on schedule and within budget.
                      </p>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="mt-auto">
                      <ul className="space-y-2 text-left">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Detailed Documentation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Construction Accuracy</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Standards Compliance</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Project Coordination</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - Building image */}
                  <div ref={businessService4ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                      <img
                        src="/images/technical_drawings.png"
                        alt="Technical Drawings"
                        className="w-full h-full object-cover"
                      />
                    </div>
                </div>
                
                {/* Horizontal line separator */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
                
                {/* Product BIM Modelling Service content - responsive layout */}
                <div ref={businessService5Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Building image */}
                  <div ref={businessService5ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                      <img
                        src="/images/product_bim_modelling.png"
                        alt="Product BIM Modelling"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Right side - Text content */}
                  <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                    <div className="text-right">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                        Product BIM Modelling
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                        Develop comprehensive BIM models for products and components that integrate seamlessly with building systems. Our detailed 3D models enable better coordination, reduce conflicts, and streamline the construction process.
                      </p>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="mt-auto">
                      <ul className="space-y-2 text-right">
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">3D Component Models</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">System Integration</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Conflict Resolution</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                        <li className="flex items-start justify-end">
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Construction Streamlining</span>
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                {/* Horizontal line separator */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
                
                {/* BIM Management and Environment Implementation Service content - responsive layout */}
                <div ref={businessService6Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Text content */}
                  <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                        BIM Management and Environment Implementation
                      </h3>
                      <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                        Implement comprehensive BIM workflows and standards across your organization. We establish robust BIM environments, train your teams, and ensure consistent data management throughout the project lifecycle.
                      </p>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="mt-auto">
                      <ul className="space-y-2 text-left">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Workflow Implementation</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Team Training</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Data Management</span>
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Standards Compliance</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - Building image */}
                  <div ref={businessService6ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                    <img
                      src="/images/BIM Management and Environment Implementation.png"
                      alt="BIM Management and Environment Implementation"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                
                {/* Horizontal line at bottom */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

              </div>
            </div>
          </div>
        </section>

        {/* Back Button Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => window.location.href = '/'}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                ← Back to Main Page
              </button>
              <button 
                onClick={scrollToContact}
                className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                Ready to start? →
              </button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default BusinessesPage;
