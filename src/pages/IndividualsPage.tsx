import React, { useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from '../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

interface IndividualsPageProps {
  darkMode: boolean;
}

const IndividualsPage: React.FC<IndividualsPageProps> = ({ darkMode }) => {
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
  // Services section refs
  const servicesSectionRef = useRef<HTMLElement>(null);
  const servicesHeadingRef = useRef<HTMLHeadingElement>(null);
  const servicesContentRef = useRef<HTMLDivElement>(null);
  
  // Individual service refs
  const service0Ref = useRef<HTMLDivElement>(null);
  const service0ImageRef = useRef<HTMLDivElement>(null);
  const service1Ref = useRef<HTMLDivElement>(null);
  const service1ImageRef = useRef<HTMLDivElement>(null);
  const service2Ref = useRef<HTMLDivElement>(null);
  const service2ImageRef = useRef<HTMLDivElement>(null);
  const service3Ref = useRef<HTMLDivElement>(null);
  const service3ImageRef = useRef<HTMLDivElement>(null);
  const service4Ref = useRef<HTMLDivElement>(null);
  const service4ImageRef = useRef<HTMLDivElement>(null);

  // Services section animations
  useEffect(() => {
    const setupServicesAnimations = () => {
      if (servicesSectionRef.current) {
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        
        // Set initial state for all service items
        const serviceItems = [
          service0Ref.current, service0ImageRef.current,
          service1Ref.current, service1ImageRef.current,
          service2Ref.current, service2ImageRef.current,
          service3Ref.current, service3ImageRef.current,
          service4Ref.current, service4ImageRef.current
        ].filter(Boolean);

        gsap.set(serviceItems, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 80,
          scale: isMobile ? 1 : 0.9
        });

        // Individual ScrollTrigger for Service 0 - Consultancy (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: service0Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(service0Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(service0ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Service 1 - Architecture (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: service1Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(service1Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(service1ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Service 2 - Interior Design (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: service2Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(service2Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(service2ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Service 3 - Urban Planning (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: service3Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(service3Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(service3ImageRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Service 4 - Project Management (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: service4Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              gsap.to(service4Ref.current, {
                opacity: 1,
                y: 0,
                x: 0,
                duration: 0.6,
                ease: "back.out(1.7)"
              });
              gsap.to(service4ImageRef.current, {
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

    const timer = setTimeout(setupServicesAnimations, 100);

    // Add resize listener for responsive behavior
    const handleResize = () => {
      setupServicesAnimations();
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
        {/* Hero — rounded frame matches case-study / CTA image treatment */}
        <div className="px-4 pt-4 sm:px-6 lg:px-8">
        <section
          className="relative z-10 flex min-h-[calc(100vh-2rem)] items-center justify-center overflow-hidden rounded-3xl sm:min-h-[calc(100vh-2.5rem)]"
          style={{
            backgroundImage: 'url(/images/homepage_home_op1.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
                INDIVIDUALS
              </h1>
              <div className="max-w-4xl mx-auto">
                <p className="text-lg sm:text-xl text-white leading-relaxed">
                  Our architectural consultancy helps you make the most of your space — beautifully, functionally, and efficiently. With thoughtful planning from the start, we ensure your project works seamlessly, avoiding costly revisions later. Every design decision is guided by clarity, creativity, and practicality, so your vision takes shape with confidence.
                </p>
              </div>
            </div>
          </div>
        </section>
        </div>

        {/* Services Section */}
        <section id="services" ref={servicesSectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
              {/* Service details */}
              <div ref={servicesContentRef} className="flex-1 w-full">
                {/* Horizontal line at top */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
                
                {/* Consultancy Service content - responsive layout */}
                <div ref={service0Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Text content */}
                  <div className="flex-1 relative flex flex-col h-auto w-full lg:w-auto gap-3 lg:gap-4">
                    <div className="w-full min-w-0">
                    <div className="text-left bg-midnight rounded-3xl p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-left">
                        Consultancy
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                        Our architectural consultancy helps you make the most of your space — beautifully, functionally, and efficiently. With thoughtful planning from the start, we ensure your project works seamlessly, avoiding costly revisions later. Every design decision is guided by clarity, creativity, and practicality, so your vision takes shape with confidence.
                      </p>
                    </div>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="w-full flex flex-col min-w-0">
                      <ul className="grid grid-cols-2 gap-2 w-full text-left">
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Space Optimization</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Thoughtful Planning</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Cost-Effective Solutions</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Clear Design Vision</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - Building image */}
                  <div ref={service0ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0 !rounded-3xl">
                    <img
                      src="/images/service0.png"
                      alt="Architectural Consultancy"
                      className="h-full w-full object-cover !rounded-3xl"
                    />
                  </div>
                </div>
                
                {/* Horizontal line separator */}
                <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
                
                {/* Service content - responsive layout */}
                <div ref={service1Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Building image */}
                  <div ref={service1ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0 !rounded-3xl">
                    <img
                      src="/images/service2.png"
                      alt="Modern Architecture"
                      className="h-full w-full object-cover !rounded-3xl"
                    />
                  </div>
                  
                  {/* Right side - Text content */}
                  <div className="flex-1 relative flex flex-col h-auto w-full lg:w-auto gap-3 lg:gap-4">
                    <div className="w-full min-w-0">
                    <div className="text-right bg-midnight rounded-3xl p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-right">
                        Architectural design
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right">
                        Whether you want to design a nice family house or a cosy office in the back yard, we can create elegant and practical functional spaces for you to feel the best at home
                      </p>
                    </div>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="w-full flex flex-col min-w-0">
                      <ul className="grid grid-cols-2 gap-2 w-full text-right">
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Family House Design</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Cozy Home Spaces</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Functional Office Spaces</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Elegant & Practical Solutions</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                 {/* Horizontal line at bottom */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

                 {/* Service 2 - Interior Design */}
                 {/* Horizontal line at top */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
                 
                {/* Service content - responsive layout */}
                <div ref={service2Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Text content */}
                  <div className="flex-1 relative flex flex-col h-auto w-full lg:w-auto gap-3 lg:gap-4">
                    <div className="w-full min-w-0">
                    <div className="text-left bg-midnight rounded-3xl p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-left">
                        Interior Design
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                        We transform homes and interiors into spaces that truly reflect you. Whether you're renovating a beloved property or redesigning your living environment, our designs combine beauty, functionality, and thoughtful detail, helping you enjoy every corner of your home to the fullest.
                      </p>
                    </div>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="w-full flex flex-col min-w-0">
                      <ul className="grid grid-cols-2 gap-2 w-full text-left">
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Space Planning</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Material Selection</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Lighting Design</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Furniture Layout</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - Building image */}
                  <div ref={service2ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0 !rounded-3xl">
                    <img
                      src="/images/service3.png"
                      alt="Interior Design"
                      className="h-full w-full object-cover !rounded-3xl"
                    />
                  </div>
                </div>
                 
                 {/* Horizontal line at bottom */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

                 {/* Service 3 - Planning Uplift */}
                 {/* Horizontal line at top */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
                 
                {/* Service content - responsive layout */}
                <div ref={service3Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Building image */}
                  <div ref={service3ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0 !rounded-3xl">
                    <img
                      src="/images/service6.png"
                      alt="Planning Uplift"
                      className="h-full w-full object-cover !rounded-3xl"
                    />
                  </div>
                  
                  {/* Right side - Text content */}
                  <div className="flex-1 relative flex flex-col h-auto w-full lg:w-auto gap-3 lg:gap-4">
                    <div className="w-full min-w-0">
                    <div className="text-right bg-midnight rounded-3xl p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-right">
                        Planning Uplift
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-right">
                        Our planning uplift service focuses on maximising the potential of your property. From well-considered home extensions to new-build developments, we identify design and planning strategies that add measurable value. Whether you're improving your home or preparing land for investment, we create proposals that are both commercially and architecturally strong.
                      </p>
                    </div>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="w-full flex flex-col min-w-0">
                      <ul className="grid grid-cols-2 gap-2 w-full text-right">
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Property Potential Maximisation</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Home Extensions & New Builds</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Value-Adding Strategies</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] w-full items-center justify-end gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Commercial & Architectural Proposals</span>
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                 
                 {/* Horizontal line at bottom */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

                 {/* Service 4 - Architectural Supervision */}
                 {/* Horizontal line at top */}
                 <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
                 
                {/* Service content - responsive layout */}
                <div ref={service4Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-start w-full min-h-[400px] lg:min-h-0">
                  {/* Left side - Text content */}
                  <div className="flex-1 relative flex flex-col h-auto w-full lg:w-auto gap-3 lg:gap-4">
                    <div className="w-full min-w-0">
                    <div className="text-left bg-midnight rounded-3xl p-6 sm:p-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 text-left">
                        Architectural Supervision and Design Management
                      </h3>
                      <p className="text-base sm:text-lg text-gray-300 leading-relaxed text-left">
                        Our architectural supervision ensures your project is built right the first time. By carefully monitoring construction and coordinating every detail, we help prevent costly mistakes and unnecessary revisions, saving time and money while making sure your design is executed flawlessly.
                      </p>
                    </div>
                    </div>
                    
                    {/* Bullet points at bottom */}
                    <div className="w-full flex flex-col min-w-0">
                      <ul className="grid grid-cols-2 gap-2 w-full text-left">
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Quality Assurance</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Cost and Time Efficiency</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Smooth Coordination</span>
                        </li>
                        <li className="flex h-full min-h-[4.5rem] items-center gap-2.5 rounded-2xl border border-black bg-white px-3 sm:px-4 py-2.5 text-gray-900">
                          <span className="w-1.5 h-1.5 shrink-0 rounded-full bg-black"></span>
                          <span className="min-w-0 flex-1 text-sm sm:text-base text-gray-900">Design Integrity</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Right side - Building image */}
                  <div ref={service4ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0 !rounded-3xl">
                    <img
                      src="/images/service4.png"
                      alt="Architectural Supervision"
                      className="h-full w-full object-cover !rounded-3xl"
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
                 className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-2xl text-white bg-midnight hover:bg-zinc-800 dark:bg-white dark:text-midnight dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105"
               >
                 ← Back to Main Page
               </button>
               <button 
                 onClick={scrollToContact}
                 className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-2xl text-white bg-midnight hover:bg-zinc-800 dark:bg-white dark:text-midnight dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105"
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

export default IndividualsPage;
