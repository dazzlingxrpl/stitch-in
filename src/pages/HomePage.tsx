import React, { useRef, useEffect, useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import HeroDesign from '../components/HeroDesign';
import Footer from '../components/Footer';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText);

interface HomePageProps {
  darkMode: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ darkMode }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  
  const heroSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutText1Ref = useRef<HTMLParagraphElement>(null);
  const aboutText2Ref = useRef<HTMLParagraphElement>(null);

  // Projects section refs
  const projectsSectionRef = useRef<HTMLElement>(null);
  const projectsHeadingRef = useRef<HTMLHeadingElement>(null);
  const project1Ref = useRef<HTMLDivElement>(null);
  const project1ImageRef = useRef<HTMLImageElement>(null);
  const project1CardRef = useRef<HTMLDivElement>(null);
  const project2Ref = useRef<HTMLDivElement>(null);
  const project2ImageRef = useRef<HTMLImageElement>(null);
  const project2CardRef = useRef<HTMLDivElement>(null);
  const project3Ref = useRef<HTMLDivElement>(null);
  const project3ImageRef = useRef<HTMLImageElement>(null);
  const project3CardRef = useRef<HTMLDivElement>(null);

  // Gallery section refs
  const gallerySectionRef = useRef<HTMLElement>(null);
  const galleryTitleRef = useRef<HTMLHeadingElement>(null);
  const galleryImage1Ref = useRef<HTMLDivElement>(null);
  const galleryImage2Ref = useRef<HTMLDivElement>(null);
  const galleryImage3Ref = useRef<HTMLDivElement>(null);
  const galleryImage4Ref = useRef<HTMLDivElement>(null);
  const galleryImage5Ref = useRef<HTMLDivElement>(null);

  // Partners section refs
  const partnersSectionRef = useRef<HTMLElement>(null);

  // Testimonials section refs
  const testimonialsSectionRef = useRef<HTMLElement>(null);
  const testimonialsTitleRef = useRef<HTMLHeadingElement>(null);
  const quoteTextRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLParagraphElement>(null);

  // CTA section refs
  const ctaSectionRef = useRef<HTMLElement>(null);
  const ctaTitleRef = useRef<HTMLHeadingElement>(null);
  const ctaSubtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaButtonRef = useRef<HTMLButtonElement>(null);
  const ctaImageRef = useRef<HTMLDivElement>(null);

  // Handle hash navigation on page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      // Wait for page to fully load, then scroll to the section
      const scrollToHash = () => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      };
      
      // Try multiple times to ensure the element is loaded
      setTimeout(scrollToHash, 100);
      setTimeout(scrollToHash, 300);
      setTimeout(scrollToHash, 500);
    }
  }, []);

  // No animation effect for the logo - static display
  useEffect(() => {
    // Nothing needed here for static logo display
  }, [darkMode]);

  // About section animations
  useEffect(() => {
    const setupAboutAnimations = () => {
      if (aboutSectionRef.current && aboutHeadingRef.current && aboutText1Ref.current && aboutText2Ref.current) {
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        
        // Set initial state - visible on mobile, hidden on desktop
        const aboutElements = [aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current].filter(Boolean);
        if (aboutElements.length > 0) {
          gsap.set(aboutElements, {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 50
          });
        }

        // Create a simple scroll-triggered animation (only on desktop)
        if (!isMobile && aboutSectionRef.current && aboutHeadingRef.current && aboutText1Ref.current && aboutText2Ref.current) {
          ScrollTrigger.create({
            trigger: aboutSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              const elements = [aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current].filter(Boolean);
              if (elements.length > 0) {
                gsap.fromTo(elements, 
                  {
                    opacity: 0,
                    y: 50
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.2
                  }
                );
              }
            }
          });
        }
      }
    };

    const timer = setTimeout(setupAboutAnimations, 100);

    // Add resize listener for responsive behavior
    const handleResize = () => {
      setupAboutAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Projects section animations
  useEffect(() => {
    const setupProjectsAnimations = () => {
      if (projectsSectionRef.current && projectsHeadingRef.current) {
        // Check if mobile device
        const isMobile = window.innerWidth < 768;
        
        // Set initial state for heading
        gsap.set(projectsHeadingRef.current, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 50
        });

        // Set initial state for all project images and cards
        const projectImages = [
          project1ImageRef.current, project2ImageRef.current, project3ImageRef.current
        ].filter(Boolean);

        const projectCards = [
          project1CardRef.current, project2CardRef.current, project3CardRef.current
        ].filter(Boolean);

        // Set initial state for images - start with clipPath hiding them (only on desktop)
        if (!isMobile) {
          gsap.set(project1ImageRef.current, {
            clipPath: "inset(0 100% 0 0)" // Project 1: hidden from right (swipe right to left)
          });
          
          gsap.set(project2ImageRef.current, {
            clipPath: "inset(0 0 0 100%)" // Project 2: hidden from left (swipe left to right)
          });
          
          gsap.set(project3ImageRef.current, {
            clipPath: "inset(0 100% 0 0)" // Project 3: hidden from right (swipe right to left)
          });
        } else {
          // On mobile, images are visible immediately
          const projectImages = [project1ImageRef.current, project2ImageRef.current, project3ImageRef.current].filter(Boolean);
          if (projectImages.length > 0) {
            gsap.set(projectImages, {
              clipPath: "inset(0 0 0 0)"
            });
          }
        }

        // Set initial state for cards - visible on mobile, hidden on desktop
        gsap.set(projectCards, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 30,
          scale: isMobile ? 1 : 0.95
        });

        // Create scroll-triggered animation for projects heading (only on desktop)
        if (!isMobile && projectsSectionRef.current && projectsHeadingRef.current) {
          ScrollTrigger.create({
            trigger: projectsSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate heading first
              gsap.to(projectsHeadingRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out"
              });
            }
          });
        }

        // Individual ScrollTrigger for Project 1 - Coastal Villa (only on desktop)
        if (!isMobile && project1Ref.current && project1ImageRef.current && project1CardRef.current) {
          ScrollTrigger.create({
          trigger: project1Ref.current,
          start: "top 85%",
          once: true,
          onEnter: () => {
            // Project 1 - swipe reveal from right to left
            gsap.to(project1ImageRef.current, {
              clipPath: "inset(0 0% 0 0)", // Reveal the image completely
              duration: 1.2,
              ease: "power2.out"
            });
            gsap.to(project1CardRef.current, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "back.out(1.7)"
            });
          }
        });

        // Individual ScrollTrigger for Project 2 - Modern Residence
        if (project2Ref.current && project2ImageRef.current && project2CardRef.current) {
          ScrollTrigger.create({
            trigger: project2Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              // Project 2 - swipe reveal from left to right
              gsap.to(project2ImageRef.current, {
                clipPath: "inset(0 0 0 0%)", // Reveal from left to right
                duration: 1.2,
                ease: "power2.out"
              });
              gsap.to(project2CardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
              });
            }
          });
        }

        // Individual ScrollTrigger for Project 3 - Urban Loft
        if (project3Ref.current && project3ImageRef.current && project3CardRef.current) {
          ScrollTrigger.create({
            trigger: project3Ref.current,
            start: "top 85%",
            once: true,
            onEnter: () => {
              // Project 3 - swipe reveal from right to left
              gsap.to(project3ImageRef.current, {
                clipPath: "inset(0 0% 0 0)",
                duration: 1.2,
                ease: "power2.out"
              });
              gsap.to(project3CardRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)"
              });
            }
          });
        }
        }
      }
    };

    const timer = setTimeout(setupProjectsAnimations, 100);

    // Add resize listener for responsive behavior
    const handleResize = () => {
      setupProjectsAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Gallery section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gallerySectionRef.current && galleryTitleRef.current) {
        // Set initial state for title
        gsap.set(galleryTitleRef.current, {
          opacity: 0,
          y: 50
        });

        // Set initial state for all gallery images
        const galleryImages = [
          galleryImage1Ref.current, galleryImage2Ref.current, 
          galleryImage3Ref.current, galleryImage4Ref.current, galleryImage5Ref.current
        ].filter(Boolean);

        gsap.set(galleryImages, {
          opacity: 0,
          y: 100,
          scale: 0.8,
          rotation: 2
        });

        // Create scroll-triggered animation for gallery
        if (gallerySectionRef.current && galleryTitleRef.current) {
          ScrollTrigger.create({
            trigger: gallerySectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate title first
              gsap.to(galleryTitleRef.current, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out"
              });

            // Define gallery images array
            const galleryImages = [
              galleryImage1Ref.current,
              galleryImage2Ref.current,
              galleryImage3Ref.current,
              galleryImage4Ref.current,
              galleryImage5Ref.current
            ].filter(Boolean);

            // Animate gallery images with stagger
            gsap.to(galleryImages, {
              opacity: 1,
              y: 0,
              scale: 1,
              rotation: 0,
              duration: 1.2,
              ease: "back.out(1.7)",
              stagger: 0.2
            });
          }
        });
        }

        // Add hover animations for each gallery image
        galleryImages.forEach((image, index) => {
          if (image) {
            const imgElement = image.querySelector('img');
            const overlay = image.querySelector('.gallery-overlay');
            
            // Hover enter animation
            image.addEventListener('mouseenter', () => {
              gsap.to(image, {
                scale: 1.05,
                rotation: 0,
                duration: 0.6,
                ease: "power2.out"
              });
              
              if (imgElement) {
                gsap.to(imgElement, {
                  scale: 1.1,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
              
              if (overlay) {
                gsap.to(overlay, {
                  opacity: 1,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            });

            // Hover leave animation
            image.addEventListener('mouseleave', () => {
              gsap.to(image, {
                scale: 1,
                rotation: index % 2 === 0 ? 1 : -1,
                duration: 0.6,
                ease: "power2.out"
              });
              
              if (imgElement) {
                gsap.to(imgElement, {
                  scale: 1,
                  duration: 0.6,
                  ease: "power2.out"
                });
              }
              
              if (overlay) {
                gsap.to(overlay, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.out"
                });
              }
            });
          }
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Gallery section animations
  useEffect(() => {
    const timer = setTimeout(() => {
      if (gallerySectionRef.current) {
        // Add parallax effects to gallery images
        gsap.utils.toArray('.gallery-image').forEach((image: any, index) => {
          const speed = [2.4, 1.8, 2.2, 1.5][index] || 1.5;
          gsap.to(image, {
            yPercent: -50 * speed,
            ease: "none",
            scrollTrigger: {
              trigger: image,
              start: "top bottom",
              end: "bottom top",
              scrub: true
            }
          });
        });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Testimonials section animations
  useEffect(() => {
    const setupTestimonialsAnimations = () => {
      const isMobile = window.innerWidth < 768;
      
      if (testimonialsSectionRef.current && quoteTextRef.current) {
        // Set initial state conditionally for mobile
        const testimonialsElements = [testimonialsTitleRef.current, authorRef.current].filter(Boolean);
        if (testimonialsElements.length > 0) {
          gsap.set(testimonialsElements, {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 50,
            scale: isMobile ? 1 : 0.9
          });
        }
        
        gsap.set(quoteTextRef.current, {
          opacity: isMobile ? 1 : 0
        });

        let split: any = null;
        
        // Only use SplitText on desktop
        if (!isMobile) {
          // Split the text into words using SplitText
          split = new SplitText(quoteTextRef.current, {
            type: "words",
            wordsClass: "word"
          });

          // Set initial state for split words
          gsap.set(split.words, {
            opacity: 0,
            y: 30
          });
        }

        // Only create scroll-triggered animation on desktop
        if (!isMobile && testimonialsSectionRef.current && testimonialsTitleRef.current && authorRef.current && quoteTextRef.current) {
          ScrollTrigger.create({
            trigger: testimonialsSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate title with bounce effect
              gsap.to(testimonialsTitleRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.2,
                ease: "back.out(1.7)"
              });

              // Animate author with delay
              gsap.to(authorRef.current, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1,
                ease: "power2.out",
                delay: 0.5
              });

              // Show the quote container
              gsap.to(quoteTextRef.current, {
                opacity: 1,
                duration: 0.5,
                delay: 0.8
              });

              // Animate words with stagger
              if (split && split.words) {
                gsap.to(split.words, {
                  opacity: 1,
                  y: 0,
                  duration: 0.6,
                  stagger: 0.1,
                  delay: 1.2,
                  ease: "power2.out"
                });
              }
            }
          });
        }

        // Cleanup function
        return () => {
          if (split) {
            split.revert();
          }
        };
      }
    };

    const timer = setTimeout(setupTestimonialsAnimations, 100);

    // Handle resize
    const handleResize = () => {
      setupTestimonialsAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // CTA section animations
  useEffect(() => {
    const setupCTAAnimations = () => {
      const isMobile = window.innerWidth < 768;
      
      if (ctaSectionRef.current && ctaTitleRef.current) {
        // Set initial state conditionally for mobile
        const ctaElements = [ctaTitleRef.current, ctaButtonRef.current].filter(Boolean);
        if (ctaElements.length > 0) {
          gsap.set(ctaElements, {
            opacity: isMobile ? 1 : 0,
            y: isMobile ? 0 : 50
          });
        }
        
        gsap.set(ctaImageRef.current, {
          opacity: isMobile ? 1 : 0,
          scale: isMobile ? 1 : 0.8,
          y: isMobile ? 0 : 100
        });

        // Only create scroll-triggered animation on desktop
        if (!isMobile && ctaSectionRef.current && ctaTitleRef.current && ctaButtonRef.current && ctaImageRef.current) {
          ScrollTrigger.create({
            trigger: ctaSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate text elements
              const textElements = [ctaTitleRef.current, ctaButtonRef.current].filter(Boolean);
              if (textElements.length > 0) {
                gsap.to(textElements, {
                  opacity: 1,
                  y: 0,
                  duration: 1,
                  ease: "power2.out",
                  stagger: 0.2
                });
              }

              // Animate image with delay
              if (ctaImageRef.current) {
                gsap.to(ctaImageRef.current, {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  duration: 1.2,
                  delay: 0.5,
                  ease: "back.out(1.7)"
                });
              }
            }
          });
        }
      }
    };

    const timer = setTimeout(setupCTAAnimations, 100);

    // Handle resize
    const handleResize = () => {
      setupCTAAnimations();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .gallery-images {
            position: relative;
          }
        `
      }} />
      <div className="overflow-x-hidden">
      {/* Hero Section with Hero Image background */}
      <section ref={heroSectionRef} className="relative h-screen overflow-hidden z-10">
        {/* Hero Image background for all screen sizes */}
        <div className="absolute inset-0 z-0">
          <div 
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: 'url(/images/hero_imagev3.png)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover'
            }}
          ></div>
        </div>
        
        {/* Dark overlay to ensure logo visibility */}
        <div className="absolute inset-0 bg-black bg-opacity-30 z-0"></div>
        
        {/* Hero content */}
        <div className="relative h-full z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-end">
            <div className="text-center sm:text-right w-full">
              <div className="mb-8">
                <img
                  src="/images/main_logo_white.png"
                  alt="Stitch In Logo"
                  className="h-28 sm:h-32 lg:h-36 w-auto mx-auto sm:ml-auto sm:mr-0 drop-shadow-lg"
                />
              </div>
              
              {/* Mobile: Add a subtitle */}
              <div className="lg:hidden text-center sm:text-right">
                <h1 className="text-2xl sm:text-3xl font-light text-white mb-4">
                  Architecture & Design
                </h1>
                <p className="text-base sm:text-lg text-white max-w-md mx-auto sm:ml-auto sm:mr-0">
                  Creating spaces that inspire, connect, and transform lives through innovative design.
                </p>
              </div>
              
              {/* <button className="inline-flex items-center px-6 py-2.5 border border-transparent text-base font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors">
                Explore Our Portfolio
              </button> */}
            </div>
          </div>
        </div>
      </section>



      {/* Second Section - About */}
      <section id="about" ref={aboutSectionRef} className="py-12 sm:py-16 lg:py-20 bg-transparent backdrop-blur-sm relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            {/* Left side - ABOUT heading */}
            <div className="flex-shrink-0 text-left">
              <h2 ref={aboutHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white text-left">
                ABOUT US
              </h2>
            </div>
            
            {/* Right side - Two columns of text */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-2xl">
              <div>
                <p ref={aboutText1Ref} className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-left md:text-right">
                  At Stitch In, we bring fresh perspectives and thoughtful solutions to every project. Our approach combines creativity and practicality, allowing us to adapt to different contexts while delivering designs that are both functional and inspiring.
                </p>
              </div>
              <div>
                <p ref={aboutText2Ref} className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-left md:text-right">
                  We specialize in sustainable, forward-thinking architecture that respects the environment and cultural context. Our ability to work across borders offers innovative solutions globally informed yet locally relevant, ensuring each project meets its full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Services Navigation Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              OUR SERVICES
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl">
              Choose the service category that best fits your needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Individuals Card */}
            <Link 
              to="/individuals"
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div 
                className="relative h-80 sm:h-96 lg:h-[500px] bg-cover bg-center"
               style={{
                 backgroundImage: 'url(/images/homepage_home_op1.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
              FOR INDIVIDUALS
                    </h3>
                    <p className="text-lg sm:text-xl max-w-md mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      Personal architectural solutions for homes, offices, and individual projects
                    </p>
                  </div>
                  </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
                </div>
              </div>
            </Link>

            {/* Businesses Card */}
            <Link 
              to="/businesses"
              className="group relative overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div 
                className="relative h-80 sm:h-96 lg:h-[500px] bg-cover bg-center"
               style={{
                 backgroundImage: 'url(/images/homepage_business_op1.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 group-hover:scale-110 transition-transform duration-300">
              FOR BUSINESSES
                    </h3>
                    <p className="text-lg sm:text-xl max-w-md mx-auto opacity-90 group-hover:opacity-100 transition-opacity duration-300">
                      Professional BIM, design, and technical services for commercial projects
                    </p>
                  </div>
                  </div>
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
              </div>
                </div>
            </Link>
           </div>
         </div>
       </section>

      {/* Fourth Section - Projects */}
      <section id="projects" ref={projectsSectionRef} className="py-12 sm:py-16 lg:py-20 relative z-40">
        {/* Mobile: Cool white gradient background */}
        <div className="lg:hidden absolute inset-0 z-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gray-400 dark:bg-gray-500 rounded-full blur-2xl"></div>
          </div>
        </div>
        
        {/* Desktop: Original background */}
        <div className="hidden lg:block absolute inset-0 z-0 bg-white dark:bg-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            {/* Left side - CASE STUDIES heading */}
            <div className="flex-shrink-0 lg:w-auto w-full text-left">
              <h2 ref={projectsHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white text-left">
                CASE STUDIES
              </h2>
            </div>
            
            {/* Right side - Empty space */}
            <div className="flex-1 max-w-4xl w-full">
            </div>
          </div>
          
          {/* Project image below the title section */}
          <div ref={project1Ref} className="relative w-full lg:w-4/5 h-[300px] sm:h-[400px] lg:h-[600px] mt-12 lg:mt-24 mx-auto lg:mx-0 px-4 lg:px-0">
            <img
              ref={project1ImageRef}
              src="/images/projects1.png"
              alt="Coastal Villa Project"
              className="w-full h-full object-cover"
            />
            
            {/* Project description card overlay */}
            <div ref={project1CardRef} className="absolute top-1/2 left-1/2 lg:left-auto lg:right-0 transform -translate-y-1/2 -translate-x-1/2 lg:translate-x-1/2 lg:-translate-x-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 sm:p-6 w-64 sm:w-72 lg:w-64 text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 text-left">
                One-Stop Border Post
              </h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-left">
                <span>Ukraine</span>
                <span className="mx-2">•</span>
                <span>Project</span>
                <span className="mx-2">•</span>
                <span>2018</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                Bilateral Customs and Border Crossing Facility designed to streamline movement, ensure security and support efficient operations for vehicles, pedestrians and staff.
              </p>
            </div>
          </div>

          {/* Second Project image below the first */}
          <div ref={project2Ref} className="relative w-full lg:w-4/5 h-[300px] sm:h-[400px] lg:h-[600px] mt-16 lg:mt-28 mx-auto lg:ml-auto px-4 lg:px-0">
            <img
              ref={project2ImageRef}
              src="/images/projects2.png"
              alt="Modern Residence Project"
              className="w-full h-full object-cover"
            />
            
            {/* Project description card overlay - mirrored to left side */}
            <div ref={project2CardRef} className="absolute top-1/2 left-1/2 lg:left-0 transform -translate-y-1/2 -translate-x-1/2 lg:-translate-x-1/2 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 sm:p-6 w-64 sm:w-72 lg:w-64 text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 text-left">
                Residential Development
              </h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-left">
                <span>Ukraine</span>
                <span className="mx-2">•</span>
                <span>Residential</span>
                <span className="mx-2">•</span>
                <span>2022</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                A five-storey residential development with commercial spaces on the ground floor, designed to support vibrant street life and efficient urban living
              </p>
            </div>
          </div>

          {/* Third Project image below the second */}
          <div ref={project3Ref} className="relative w-full lg:w-4/5 h-[300px] sm:h-[400px] lg:h-[600px] mt-16 lg:mt-28 mx-auto lg:mx-0 px-4 lg:px-0">
            <img
              ref={project3ImageRef}
              src="/images/work_images/house3.jpg"
              alt="Urban Loft Project"
              className="w-full h-full object-cover"
            />
            
            {/* Project description card overlay - same as first (right side) */}
            <div ref={project3CardRef} className="absolute top-1/2 left-1/2 lg:left-auto lg:right-0 transform -translate-y-1/2 -translate-x-1/2 lg:translate-x-1/2 lg:-translate-x-0 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 p-4 sm:p-6 w-64 sm:w-72 lg:w-64 text-left">
              <h3 className="text-lg sm:text-2xl font-bold text-gray-900 mb-2 text-left">
                Family dwelling
              </h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-left">
                <span>Ukraine</span>
                <span className="mx-2">•</span>
                <span>Residential</span>
                <span className="mx-2">•</span>
                <span>2025</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                A thoughtfully designed detached house combining functional layouts, natural light and elegant detailing to support comfortable everyday living
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Section - Interactive Gallery */}
      <section id="gallery" ref={gallerySectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Gallery Title */}
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              GALLERY
            </h2>
          </div>

          {/* Gallery Grid with Parallax */}
          <div className="gallery-images grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-24 lg:mt-48">
            <div className="gallery-image group cursor-pointer">
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg">
                <img
                  src="/images/service2.png"
                  alt="Modern Architecture"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Modern Architecture</h3>
                    <p className="text-xs sm:text-sm">Contemporary design</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-image group cursor-pointer">
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg">
                <img
                  src="/images/gallery2.png"
                  alt="Interior Design"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Interior Design</h3>
                    <p className="text-xs sm:text-sm">Elegant spaces</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-image group cursor-pointer">
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg">
                <img
                  src="/images/gallery3.png"
                  alt="Urban Planning"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Urban Planning</h3>
                    <p className="text-xs sm:text-sm">Sustainable communities</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="gallery-image group cursor-pointer">
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg">
                <img
                  src="/images/gallery4.png"
                  alt="Residential Design"
                  className="w-full h-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
                  <div className="text-white text-center">
                    <h3 className="text-lg sm:text-xl font-bold mb-1">Residential Design</h3>
                    <p className="text-xs sm:text-sm">Dream homes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Partners Section */}
      <section id="partners" ref={partnersSectionRef} className="py-12 sm:py-16 lg:py-20 bg-gray-200 dark:bg-gray-800 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-4">
              OUR PARTNERS
            </h2>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="https://www.consedge.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-all duration-300 hover:scale-110 hover:opacity-80 cursor-pointer"
            >
              <img
                src="/images/consedge_logo.svg"
                alt="Consedge Logo"
                className="h-12 sm:h-16 lg:h-20 w-auto"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Sixth Section - Our Vision */}
      <section ref={testimonialsSectionRef} className="relative min-h-screen flex items-center justify-center z-30 py-12 sm:py-16 lg:py-0" style={{ backgroundColor: '#1e1e1e' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Section Title */}
          <div ref={testimonialsTitleRef} className="mb-8 sm:mb-12 lg:mb-16">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-white">
              OUR VISION
            </h2>
          </div>

          {/* Company Statement */}
          <div className="mb-8 sm:mb-10 lg:mb-12">
            <blockquote ref={quoteTextRef} className="text-base sm:text-lg md:text-xl lg:text-2xl text-white italic leading-relaxed font-serif">
              We believe that great design balances function, elegance, and sustainability. Every project - from the simplest layout to the most complex development - is an opportunity to create spaces that work beautifully and endure thoughtfully. We thrive on challenges that push boundaries and demand smarter solutions. The unknown doesn't intimidate us; it inspires us to explore, adapt, and innovate. Through curiosity and precision, we turn complexity into clarity - and ideas into meaningful, lasting architecture.
            </blockquote>
          </div>

          {/* Author */}
          <div ref={authorRef} className="text-white text-base sm:text-lg font-medium">
            — Stitch In Architecture
          </div>
        </div>
      </section>

      {/* Seventh Section - CTA with Overlapping Image */}
      <section id="contact" ref={ctaSectionRef} className="relative py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-center">
            {/* Left side - CTA Content */}
            <div className="space-y-6 sm:space-y-8">
              <div>
                <h2 ref={ctaTitleRef} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8 text-left">
                  Ready to Start Your Project?
                </h2>
              </div>
              
              {/* Contact Form with Formspree Integration */}
              <form 
                className="space-y-4 sm:space-y-6" 
                action="https://formspree.io/f/mvgvogap" 
                method="POST"
                onSubmit={(e: FormEvent<HTMLFormElement>) => {
                  e.preventDefault();
                  const form = e.currentTarget;
                  const formData = new FormData(form);
                  
                  fetch(form.action, {
                    method: form.method,
                    body: formData,
                    headers: {
                      Accept: 'application/json'
                    }
                  })
                    .then(response => {
                      if (response.ok) {
                        setFormSubmitted(true);
                        setSubmissionMessage('Thank you! Your message has been sent. We will be in touch shortly.');
                        form.reset();
                      } else {
                        setFormSubmitted(true);
                        setSubmissionMessage('Oops! There was a problem sending your message. Please try again later.');
                      }
                    })
                    .catch(() => {
                      setFormSubmitted(true);
                      setSubmissionMessage('Oops! There was a problem sending your message. Please try again later.');
                    });
                }}
              >
                <input type="hidden" name="subject" value="Website Enquiry" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="cta-name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Name
                    </label>
                    <input
                      type="text"
                      id="cta-name"
                      name="name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cta-email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Email
                    </label>
                    <input
                      type="email"
                      id="cta-email"
                      name="email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label htmlFor="cta-phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="cta-phone"
                    name="phone"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                    placeholder="Your phone number"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="cta-project-type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                      Project Type
                    </label>
                    <select
                      id="cta-project-type"
                      name="project-type"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                      required
                    >
                      <option value="" disabled selected>Select a project type</option>
                      <option value="Residential">Residential</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Education">Education</option>
                      <option value="Hospitality">Hospitality</option>
                      <option value="Healthcare">Healthcare</option>
                      <option value="Retail">Retail</option>
                      <option value="Industrial">Industrial</option>
                      <option value="Mixed-Use">Mixed-Use</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="cta-location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Location
                  </label>
                  <input
                    type="text"
                    id="cta-location"
                    name="location"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors"
                    placeholder="City, Country"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="cta-message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 text-left">
                    Message
                  </label>
                  <textarea
                    id="cta-message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-gray-900 dark:focus:ring-white focus:border-transparent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                    required
                  ></textarea>
                </div>
                
                <div className="text-left space-y-4">
                  <button ref={ctaButtonRef} type="submit" className="w-full md:w-auto inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 border border-transparent text-base sm:text-lg font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 transition-all duration-300 hover:scale-105">
                    Send Message
                  </button>
                  
                  {formSubmitted && (
                    <div className={`text-sm md:text-base mt-4 ${submissionMessage.includes('Oops') ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                      {submissionMessage}
                    </div>
                  )}
                </div>
              </form>
            </div>

            {/* Right side - Overlapping Image */}
            <div className="relative">
              <div ref={ctaImageRef} className="relative h-[400px] sm:h-[500px] lg:h-[700px] mt-8 sm:-mt-16 lg:-mt-32">
                <img
                  src="/images/Architectural_and_Interior_Design.png"
                  alt="Architecture Project"
                  className="w-full h-full object-cover shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
      </div>
    </>
  );
};

export default HomePage;
