import React, { useRef, useEffect, useState, FormEvent } from 'react';
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
  
  const logoRef = useRef<HTMLImageElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const aboutSectionRef = useRef<HTMLElement>(null);
  const aboutHeadingRef = useRef<HTMLHeadingElement>(null);
  const aboutText1Ref = useRef<HTMLParagraphElement>(null);
  const aboutText2Ref = useRef<HTMLParagraphElement>(null);
  
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
        gsap.set([aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current], {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 50
        });

        // Create a simple scroll-triggered animation (only on desktop)
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: aboutSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              gsap.fromTo([aboutHeadingRef.current, aboutText1Ref.current, aboutText2Ref.current], 
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

        // Individual ScrollTrigger for Business Service 2 - Architectural and Interior Design (only on desktop)
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

        // Individual ScrollTrigger for Business Service 3 - Architectural Visualisation and Animation (only on desktop)
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

        // Individual ScrollTrigger for Business Service 6 - BIM Management and Environment Implementation (only on desktop)
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
          gsap.set([project1ImageRef.current, project2ImageRef.current, project3ImageRef.current], {
            clipPath: "inset(0 0 0 0)"
          });
        }

        // Set initial state for cards - visible on mobile, hidden on desktop
        gsap.set(projectCards, {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 30,
          scale: isMobile ? 1 : 0.95
        });

        // Create scroll-triggered animation for projects heading (only on desktop)
        if (!isMobile) {
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
        if (!isMobile) {
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

        // Individual ScrollTrigger for Project 3 - Urban Loft
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
        gsap.set([testimonialsTitleRef.current, authorRef.current], {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 50,
          scale: isMobile ? 1 : 0.9
        });
        
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
        if (!isMobile) {
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
        gsap.set([ctaTitleRef.current, ctaButtonRef.current], {
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : 50
        });
        
        gsap.set(ctaImageRef.current, {
          opacity: isMobile ? 1 : 0,
          scale: isMobile ? 1 : 0.8,
          y: isMobile ? 0 : 100
        });

        // Only create scroll-triggered animation on desktop
        if (!isMobile) {
          ScrollTrigger.create({
            trigger: ctaSectionRef.current,
            start: "top 80%",
            once: true,
            onEnter: () => {
              // Animate text elements
              gsap.to([ctaTitleRef.current, ctaButtonRef.current], {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                stagger: 0.2
              });

              // Animate image with delay
              gsap.to(ctaImageRef.current, {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 1.2,
                delay: 0.5,
                ease: "back.out(1.7)"
              });
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
              backgroundImage: 'url(/images/hero_imagev2.png)',
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
                  className="h-24 sm:h-28 lg:h-32 w-auto mx-auto sm:ml-auto sm:mr-0 drop-shadow-lg"
                />
              </div>
              
              {/* Mobile: Add a subtitle */}
              <div className="lg:hidden text-center sm:text-right">
                <h1 className="text-2xl sm:text-3xl font-light text-gray-700 dark:text-gray-300 mb-4">
                  Architecture & Design
                </h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto sm:ml-auto sm:mr-0">
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
            <div className="flex-shrink-0">
              <h2 ref={aboutHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                ABOUT
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
                  We specialize in sustainable, forward-thinking architecture that respects the surrounding environment and cultural context. Our ability to work across borders enables us to offer solutions that are globally informed yet locally relevant, ensuring each project meets its full potential.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Individuals Section */}
      <section id="individuals" className="py-12 sm:py-16 lg:py-20 relative z-25" 
               style={{
                 backgroundImage: 'url(/images/individuals.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              INDIVIDUALS
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg sm:text-xl text-white leading-relaxed">
                  Our architectural consultancy helps you make the most of your space — beautifully, functionally, and efficiently. With thoughtful planning from the start, we ensure your project works seamlessly, avoiding costly revisions later. Every design decision is guided by clarity, creativity, and practicality, so your vision takes shape with confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third Section - Services */}
      <section id="services" ref={servicesSectionRef} className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900 relative z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 lg:gap-12">
            {/* Service details */}
            <div ref={servicesContentRef} className="flex-1 w-full">
              {/* Horizontal line at top */}
              <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
              
              {/* Consultancy Service content - responsive layout */}
              <div ref={service0Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                      Consultancy
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                      Our architectural consultancy helps you make the most of your space — beautifully, functionally, and efficiently. With thoughtful planning from the start, we ensure your project works seamlessly, avoiding costly revisions later. Every design decision is guided by clarity, creativity, and practicality, so your vision takes shape with confidence.
                    </p>
                  </div>
                  
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Space Optimization</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Thoughtful Planning</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Cost-Effective Solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Clear Design Vision</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Right side - Building image */}
                <div ref={service0ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/service0.png"
                    alt="Architectural Consultancy"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Horizontal line separator */}
              <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
              
              {/* Service content - responsive layout */}
              <div ref={service1Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                      Architectural design
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                      Whether you want to design a nice family house or a cosy office in the back yard, we can create elegant and practical functional spaces for you to feel the best at home
                    </p>
                  </div>
                  
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-left">
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Family House Design</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Cozy Office Spaces</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Elegant & Practical Solutions</span>
                      </li>
                      <li className="flex items-start">
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Functional Home Spaces</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                {/* Right side - Building image */}
                <div ref={service1ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/service2.png"
                    alt="Modern Architecture"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

               {/* Service 2 - Interior Design */}
               {/* Horizontal line at top */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
               
              {/* Service content - responsive layout */}
              <div ref={service2Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                      Interior Design
                     </h3>
                     <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                       Creating functional and beautiful interior spaces that enhance the human experience and reflect your unique vision.
                     </p>
                   </div>
                   
                   {/* Bullet points at bottom */}
                   <div className="mt-auto">
                     <ul className="space-y-2 text-left">
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Space Planning</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Material Selection</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Lighting Design</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Furniture Layout</span>
                       </li>
                     </ul>
                   </div>
                 </div>
                 
                {/* Right side - Building image */}
                <div ref={service2ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/service3.png"
                     alt="Interior Design"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

               {/* Service 3 - Planning Uplift */}
               {/* Horizontal line at top */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
               
              {/* Service content - responsive layout */}
              <div ref={service3Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                      Planning Uplift
                     </h3>
                     <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                       Our planning uplift service focuses on maximising the potential of your property. From well-considered home extensions to new-build developments, we identify design and planning strategies that add measurable value. Whether you're improving your home or preparing land for investment, we create proposals that are both commercially and architecturally strong.
                     </p>
                   </div>
                   
                   {/* Bullet points at bottom */}
                   <div className="mt-auto">
                     <ul className="space-y-2 text-left">
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Property Potential Maximisation</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Home Extensions & New Builds</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Value-Adding Strategies</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Commercial & Architectural Proposals</span>
                       </li>
                     </ul>
                   </div>
                 </div>
                 
                {/* Right side - Building image */}
                <div ref={service3ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/service6.png"
                     alt="Planning Uplift"
                     className="w-full h-full object-cover"
                   />
                 </div>
               </div>
               
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>

               {/* Service 4 - Architectural Supervision */}
               {/* Horizontal line at top */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mb-8"></div>
               
              {/* Service content - responsive layout */}
              <div ref={service4Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-left">
                    Architectural supervision
                     </h3>
                     <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-left">
                       Shaping sustainable communities through thoughtful planning and design that connects people with their environment.
                     </p>
                   </div>
                   
                   {/* Bullet points at bottom */}
                   <div className="mt-auto">
                     <ul className="space-y-2 text-left">
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Master Planning</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Zoning Analysis</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Community Engagement</span>
                       </li>
                       <li className="flex items-start">
                         <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 mr-3 flex-shrink-0"></span>
                         <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Sustainability Planning</span>
                       </li>
                     </ul>
                   </div>
                 </div>
                 
                {/* Right side - Building image */}
                <div ref={service4ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/service4.png"
                     alt="Architectural Supervision"
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

      {/* For Businesses Section */}
      <section id="businesses" className="py-12 sm:py-16 lg:py-20 relative z-35" 
               style={{
                 backgroundImage: 'url(/images/business.png)',
                 backgroundSize: 'cover',
                 backgroundPosition: 'center',
                 backgroundRepeat: 'no-repeat'
               }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8">
              FOR BUSINESSES
            </h2>
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
                      We transform existing buildings into accurate digital models through advanced 3D scanning. Our Scan to BIM service provides precise data that forms the foundation for renovation, extension, or new construction projects, saving time, reducing errors, and enabling informed decision-making.
                    </p>
                  </div>
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Advanced 3D Scanning</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Accurate Digital Models</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Time & Cost Savings</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Informed Decision-Making</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Horizontal line separator */}
              <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
              
              {/* Architectural and Interior Design Service content - responsive layout */}
              <div ref={businessService2Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Building image */}
                <div ref={businessService2ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/pic2.png"
                    alt="Architectural and Interior Design"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div className="text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                      Architectural and Interior Design
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                      Whether you need a full design solution or specific design elements, we create functional, elegant spaces that align with your brand and operational needs. From offices and commercial interiors to large-scale developments, our designs combine creativity, efficiency, and practical value.
                    </p>
                  </div>
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Full Design Solutions</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Brand-Aligned Spaces</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Commercial Interiors</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Creative & Practical Value</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Horizontal line separator */}
              <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
              
              {/* Architectural Visualisation and Animation Service content - responsive layout */}
              <div ref={businessService3Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Building image */}
                <div ref={businessService3ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/projects2.png"
                    alt="Architectural Visualisation and Animation"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div className="text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                      Architectural Visualisation and Animation
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                      Bring your projects to life before a single brick is laid. Our high-quality visualisations and animations communicate design intent clearly, impress stakeholders, and support marketing or investor presentations with striking realism and clarity.
                    </p>
                  </div>
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">High-Quality Visualisations</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Clear Design Communication</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Stakeholder Presentations</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Marketing Support</span>
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
                {/* Left side - Building image */}
                <div ref={businessService4ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/work_images/building4.jpg"
                    alt="Technical Drawings"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div className="text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                      Technical Drawings
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                      We produce detailed technical drawings that ensure construction accuracy and compliance with all standards. Our precise documentation reduces errors on site, simplifies coordination, and keeps projects on schedule and within budget.
                    </p>
                  </div>
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Detailed Documentation</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Construction Accuracy</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Standards Compliance</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Project Coordination</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Horizontal line separator */}
              <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8 mb-8"></div>
              
              {/* Product BIM Modelling Service content - responsive layout */}
              <div ref={businessService5Ref} className="flex flex-col lg:flex-row gap-6 lg:gap-8 lg:items-center w-full min-h-[400px] lg:min-h-0">
                {/* Left side - Building image */}
                <div ref={businessService5ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/work_images/building5.jpg"
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
                      We create detailed BIM models for products such as furniture, fixtures, and equipment, enabling seamless integration into your projects. Accurate product models improve design coordination, reduce conflicts, and streamline procurement and construction workflows.
                    </p>
                  </div>
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Detailed Product Models</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Seamless Integration</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Design Coordination</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Streamlined Workflows</span>
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
                {/* Left side - Building image */}
                <div ref={businessService6ImageRef} className="w-full lg:w-96 h-64 sm:h-80 lg:h-96 overflow-hidden shadow-lg flex-shrink-0 mx-auto lg:mx-0">
                  <img
                    src="/images/work_images/building6.jpg"
                    alt="BIM Management and Environment Implementation"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Right side - Text content */}
                <div className="flex-1 relative text-center flex flex-col h-auto lg:h-96 justify-center w-full lg:w-auto">
                  <div className="text-right">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 text-right">
                      BIM Management and Environment Implementation
                    </h3>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-4 sm:mb-6 text-right">
                      We set up and manage BIM environments for your teams of designers and engineers, ensuring smooth collaboration and consistent data standards. Our BIM management services improve efficiency, reduce errors, and enable better-informed design and construction decisions across all project stages.
                    </p>
                  </div>
                  
                  {/* Bullet points at bottom */}
                  <div className="mt-auto">
                    <ul className="space-y-2 text-right">
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">BIM Environment Setup</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Team Collaboration</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Data Standards</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                      <li className="flex items-start justify-end">
                        <span className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Project Efficiency</span>
                        <span className="w-2 h-2 bg-gray-900 dark:bg-white rounded-full mt-2 ml-3 flex-shrink-0"></span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
               
               {/* Horizontal line at bottom */}
               <div className="w-full h-px bg-gray-300 dark:bg-gray-600 mt-8"></div>
             </div>
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
            {/* Left side - PROJECTS heading */}
            <div className="flex-shrink-0 lg:w-auto w-full">
              <h2 ref={projectsHeadingRef} className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white">
                PROJECTS
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
                Coastal Villa
              </h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-left">
                <span>Aspen</span>
                <span className="mx-2">•</span>
                <span>Residential</span>
                <span className="mx-2">•</span>
                <span>2024</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                Modern Residence
              </h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-left">
                <span>London</span>
                <span className="mx-2">•</span>
                <span>Commercial</span>
                <span className="mx-2">•</span>
                <span>2023</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                Urban Loft
              </h3>
              <div className="flex items-center text-xs sm:text-sm text-gray-600 mb-3 sm:mb-4 text-left">
                <span>New York</span>
                <span className="mx-2">•</span>
                <span>Residential</span>
                <span className="mx-2">•</span>
                <span>2024</span>
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                  src="/images/gallery1.png"
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
              We believe architecture is more than just buildings—it's about creating spaces that inspire, connect, and transform lives. Our vision is to design sustainable, innovative solutions that honor both tradition and progress, crafting environments where people thrive and communities flourish.
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
                  src="/images/gallery5.png"
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
